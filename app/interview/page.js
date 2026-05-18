'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Loader, Mic, Settings2, Sparkles, StopCircle, Trophy, Activity, BrainCircuit } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Interview() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your AI interviewer today. Which type of interview would you like to practice?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [interviewType, setInterviewType] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => setSessionTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput(prev => prev + (prev ? ' ' : '') + finalTranscript);
      }
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const selectType = async (type) => {
    const allowed = await checkAndUpdateLimit();
    if (!allowed) return;

    setInterviewType(type);
    setStarted(true);
    setMessages([
      { role: 'ai', text: `Great! Let's start your ${type} interview. I'll ask you questions one by one and give feedback after each answer. Ready? Here's your first question:\n\nTell me about yourself.` }
    ]);

    const currentUserForStats = auth.currentUser;
    if (currentUserForStats) {
      const userRef = doc(db, 'users', currentUserForStats.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.exists() ? userDoc.data() : {};

      const today = new Date().toDateString();
      const lastActive = userData.lastActive || '';
      const streak = lastActive === today ? (userData.streak || 1) :
                     lastActive === new Date(Date.now() - 86400000).toDateString() ?
                     (userData.streak || 0) + 1 : 1;

      const recentActivity = userData.recentActivity || [];
      recentActivity.unshift({
        type: type,
        date: new Date().toLocaleDateString(),
        score: 'N/A'
      });
      if (recentActivity.length > 5) recentActivity.pop();

      await setDoc(userRef, {
        totalInterviews: (userData.totalInterviews || 0) + 1,
        streak: streak,
        lastActive: today,
        recentActivity: recentActivity
      }, { merge: true });
    }
  };

  async function checkAndUpdateLimit() {
    const currentUser = auth.currentUser;
    if (!currentUser) return true;

    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.exists() ? userDoc.data() : {};

    if (userData.plan === 'pro') return true;

    const today = new Date().toDateString();
    const dailyCount = userData.dailyCount || 0;
    const lastDate = userData.lastDate || '';

    if (lastDate !== today) {
      await setDoc(userRef, { dailyCount: 1, lastDate: today }, { merge: true });
      return true;
    }

    if (dailyCount >= 3) {
      setShowLimitModal(true);
      return false;
    }

    await setDoc(userRef, { dailyCount: dailyCount + 1 }, { merge: true });
    return true;
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const currentUser = auth.currentUser;
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser?.uid || 'anonymous'
        },
        body: JSON.stringify({ message: userMessage, interviewType }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const formatText = (text) => {
    const escaped = escapeHtml(text);
    const withStrong = escaped.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
    return withStrong.replace(/\n/g, '<br/>');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Immersive Header */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" />
              AI Mock Interview
            </h1>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              {started ? `Session Active • ${formatTime(sessionTime)}` : 'System Ready'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {interviewType && (
            <div className="hidden sm:flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-full text-xs font-semibold">
              <Activity size={14} />
              {interviewType}
            </div>
          )}
          <button onClick={() => alert("Settings panel coming soon! Adjust AI difficulty, voice pitch, and language here.")} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Settings2 size={18} />
          </button>
        </div>
      </header>

      {!started ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full relative z-10">
            <div className="text-center mb-10">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                <BrainCircuit size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Initialize Interview</h2>
              <p className="text-slate-400">Select an environment. The AI will adapt its persona and questioning difficulty based on your choice.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'HR Interview', desc: 'Behavioral & cultural fit', icon: '👥' },
                { title: 'Technical Interview', desc: 'DSA & core engineering', icon: '💻' },
                { title: 'Aptitude Round', desc: 'Logic & quantitative', icon: '🧠' },
                { title: 'Full Placement Round', desc: 'Comprehensive simulation', icon: '🎯' }
              ].map((type) => (
                <button 
                  key={type.title} 
                  onClick={() => selectType(type.title)}
                  className="group bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-left hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-300"
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">{type.icon}</div>
                  <h3 className="font-bold text-white mb-1">{type.title}</h3>
                  <p className="text-xs text-slate-500">{type.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* AI Visualizer Panel (Desktop Left / Mobile Top) */}
          <div className="md:w-1/3 bg-slate-900 border-r border-slate-800 flex flex-col items-center justify-center p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent"></div>
            
            {/* Animated Orb representing AI */}
            <div className="relative mb-8">
              <motion.div 
                animate={{ 
                  scale: loading ? [1, 1.2, 1] : [1, 1.05, 1],
                  opacity: loading ? [0.7, 1, 0.7] : [0.5, 0.8, 0.5]
                }} 
                transition={{ duration: loading ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
                className={`w-40 h-40 rounded-full blur-2xl absolute inset-0 ${loading ? 'bg-indigo-500' : 'bg-slate-600'}`}
              />
              <div className="w-40 h-40 rounded-full border-2 border-slate-700/50 bg-slate-950 flex items-center justify-center relative z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                {loading ? (
                  <div className="flex gap-1">
                    <motion.div animate={{ height: [10, 30, 10] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 bg-indigo-500 rounded-full" />
                    <motion.div animate={{ height: [10, 40, 10] }} transition={{ duration: 1, delay: 0.2, repeat: Infinity }} className="w-1.5 bg-indigo-500 rounded-full" />
                    <motion.div animate={{ height: [10, 20, 10] }} transition={{ duration: 1, delay: 0.4, repeat: Infinity }} className="w-1.5 bg-indigo-500 rounded-full" />
                  </div>
                ) : (
                  <BrainCircuit size={48} className="text-slate-500" />
                )}
              </div>
            </div>

            <div className="text-center relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Interviewer Status</div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${loading ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-300'}`}>
                {loading ? 'Analyzing & Typing...' : 'Listening...'}
              </div>
            </div>

            {/* Mock Confidence Meter */}
            <div className="w-full max-w-xs mt-12 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confidence Level</span>
                <span className="text-xs text-emerald-400 font-bold">Good</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500 w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Chat Interface Panel */}
          <div className="flex-1 flex flex-col bg-[#0B0F19] relative">
            <div className="flex-1 overflow-y-auto px-6 py-8 scroll-smooth" id="chat-container">
              <div className="max-w-3xl mx-auto space-y-6">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-slate-800 border border-slate-700'}`}>
                          {msg.role === 'user' ? <span className="text-xs font-bold">You</span> : <BrainCircuit size={14} className="text-indigo-400" />}
                        </div>
                        
                        {/* Bubble */}
                        <div className={`px-5 py-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                          msg.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-sm' 
                            : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-sm shadow-xl'
                        }`}>
                          {msg.role === 'ai' ? (
                            <div dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} className="prose prose-invert max-w-none prose-p:my-2 prose-strong:text-white" />
                          ) : (
                            msg.text
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="flex gap-4 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                          <BrainCircuit size={14} className="text-indigo-400" />
                        </div>
                        <div className="px-5 py-4 rounded-2xl bg-slate-900 border border-slate-800 rounded-tl-sm flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                           <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                           <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={chatEndRef} />
                </AnimatePresence>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-[#0B0F19] border-t border-slate-800/50 p-6 pt-4 backdrop-blur-xl">
              <div className="max-w-3xl mx-auto">
                <div className="relative flex items-end gap-2 bg-slate-900 border border-slate-700 focus-within:border-indigo-500/50 rounded-2xl p-2 transition-colors shadow-lg">
                  <button 
                    onClick={toggleListening}
                    className={`p-3 rounded-xl transition-colors ${isListening ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    {isListening ? <StopCircle size={20} className="animate-pulse" /> : <Mic size={20} />}
                  </button>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type your response or press mic to speak..."
                    className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-500 text-[15px] resize-none max-h-32 min-h-[44px] py-3 px-2 focus:outline-none focus:ring-0"
                    rows={1}
                  />
                  <button 
                    onClick={sendMessage} 
                    disabled={loading || !input.trim()}
                    className={`p-3 rounded-xl transition-all ${input.trim() && !loading ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-800 text-slate-500'}`}
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="text-center mt-3 flex justify-center items-center gap-4 text-xs font-medium text-slate-500">
                  <span>Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">Enter</kbd> to send</span>
                  <button onClick={() => window.location.href='/dashboard'} className="flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors">
                    <StopCircle size={14} /> End Interview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-700 shadow-inner">
              <Trophy className="text-amber-400" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Daily Limit Reached</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">You&apos;ve completed your 3 free interviews for today! Upgrade to Pro for unlimited AI practice and deep analytics.</p>
            
            <div className="flex flex-col gap-3">
              <Link href="/dashboard" className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                Unlock Pro — ₹199/mo
              </Link>
              <button onClick={() => setShowLimitModal(false)} className="w-full bg-slate-800 py-3.5 rounded-xl text-slate-300 font-semibold hover:bg-slate-700 transition-colors">
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}