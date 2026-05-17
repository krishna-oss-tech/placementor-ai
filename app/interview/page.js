'use client';
import { useState } from 'react';
import { ArrowLeft, Send, Loader } from 'lucide-react';
import { auth } from '../lib/firebase';

// 🧠 WHY: useState hook se hum component ke andar data store karte hain.
// Jab state change hoti hai — UI automatically update ho jaata hai.

export default function Interview() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your AI interviewer today. Which type of interview would you like to practice?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [interviewType, setInterviewType] = useState('');

  const selectType = (type) => {
    setInterviewType(type);
    setStarted(true);
    setMessages([
      { role: 'ai', text: `Great! Let's start your ${type} interview. I'll ask you questions one by one and give feedback after each answer. Ready? Here's your first question:\n\nTell me about yourself.` }
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    // 🧠 WHY: Hum yahan API route ko call kar rahe hain (/api/interview).
    // Direct Gemini API frontend se call nahi karte — API key expose ho jaati.
    // Backend route pe bhejte hain — woh securely Gemini se baat karta hai.
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
    const withStrong = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return withStrong.replace(/\n/g, '<br/>');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></a>
        <span className="font-semibold">AI Mock Interview</span>
        {interviewType && <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">{interviewType}</span>}
      </div>

      {/* Interview Type Selection */}
      {!started && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full">
            <h2 className="text-xl font-bold text-center mb-2">Choose Interview Type</h2>
            <p className="text-gray-500 text-center text-sm mb-8">Select what you want to practice today</p>
            <div className="grid gap-3">
              {['HR Interview', 'Technical Interview', 'Aptitude Round', 'Full Placement Round'].map((type) => (
                <button key={type} onClick={() => selectType(type)}
                  className="w-full py-4 px-6 bg-white border border-gray-200 rounded-2xl text-left hover:border-indigo-400 hover:bg-indigo-50 transition-all font-medium">
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat UI */}
      {started && (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6 max-w-3xl mx-auto w-full space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap bg-indigo-600 text-white rounded-br-sm`}>
                    {msg.text}
                  </div>
                ) : (
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap bg-white border border-gray-100 text-gray-800 rounded-bl-sm`} dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <Loader size={16} className="animate-spin text-indigo-500" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-100 px-6 py-4">
            <div className="max-w-3xl mx-auto flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your answer here..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400"
              />
              <button onClick={sendMessage} disabled={loading}
                className="bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50">
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}