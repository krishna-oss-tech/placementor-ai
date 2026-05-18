'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, BrainCircuit, Activity, Clock, Trophy, Flame, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const topics = [
  { key: 'Quantitative', label: 'Quantitative Aptitude', icon: '🔢', color: 'from-blue-500 to-cyan-500' },
  { key: 'Verbal', label: 'Verbal Reasoning', icon: '📝', color: 'from-emerald-500 to-teal-500' },
  { key: 'Logical', label: 'Logical Reasoning', icon: '🧩', color: 'from-purple-500 to-pink-500' },
  { key: 'Coding', label: 'Technical Coding', icon: '💻', color: 'from-indigo-500 to-blue-500' },
];

const difficulties = [
  { level: 'Easy', points: 50 },
  { level: 'Medium', points: 100 },
  { level: 'Hard', points: 200 }
];

export default function AptitudePage() {
  const [stage, setStage] = useState('topic');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      // Time up
      setTimerActive(false);
      handleAnswer(-1); // -1 means timeout
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const selectTopic = (key) => {
    setTopic(key);
    setStage('difficulty');
  };

  const selectDifficulty = async (level) => {
    setDifficulty(level);
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/aptitude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty: level }),
      });
      const data = await res.json();

      if (!res.ok || !data || data.error || !Array.isArray(data) || data.length === 0) {
        const message = data?.error || 'Unable to generate questions. Please try again.';
        setQuestions([]);
        setError(message);
        return;
      }

      setQuestions(data);
      setStage('quiz');
      setCurrentIndex(0);
      setSelected(null);
      setFeedback(null);
      setScore(0);
      setXp(0);
      setCombo(0);
      setTimeLeft(60);
      setTimerActive(true);
    } catch (error) {
      setQuestions([]);
      setError('Unable to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentIndex];
  const answered = selected !== null;

  const handleAnswer = (optionIndex) => {
    if (answered) return;
    setTimerActive(false);
    setSelected(optionIndex);
    
    if (!currentQuestion) return;

    const correctIndex = currentQuestion.correct ?? currentQuestion.answer;
    const isCorrect = optionIndex === correctIndex;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      const diffPoints = difficulties.find(d => d.level === difficulty)?.points || 50;
      const comboMultiplier = 1 + (combo * 0.1);
      const timeBonus = Math.floor(timeLeft / 2);
      const earnedXp = Math.floor((diffPoints + timeBonus) * comboMultiplier);
      
      setXp(prev => prev + earnedXp);
      setCombo(prev => prev + 1);
    } else {
      setCombo(0);
    }

    setFeedback({
      isCorrect,
      correctIndex,
      explanation: currentQuestion.explanation || 'No explanation available.'
    });
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setStage('result');
      return;
    }
    setCurrentIndex(prev => prev + 1);
    setSelected(null);
    setFeedback(null);
    setTimeLeft(60);
    setTimerActive(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="font-bold text-white flex items-center gap-2">
            <BrainCircuit size={18} className="text-indigo-400" />
            Aptitude Arena
          </div>
        </div>
        {stage === 'quiz' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold text-amber-400">
              <Flame size={14} className={combo > 1 ? 'animate-pulse' : ''} /> {combo}x Combo
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-400">
              <Trophy size={14} /> {xp} XP
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 px-6 py-8 flex flex-col items-center">
        
        {stage === 'topic' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-white mb-4">Select a Discipline</h1>
              <p className="text-slate-400">Choose an aptitude category to test your cognitive and technical skills.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {topics.map((item) => (
                <button 
                  key={item.key} 
                  onClick={() => selectTopic(item.key)} 
                  className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left overflow-hidden hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="flex items-start gap-5 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
                      <p className="text-sm text-slate-500">Master the core concepts and patterns frequently asked in placements.</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'difficulty' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-4">
                  <Activity size={12} /> {topic}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Select Difficulty</h2>
                <p className="text-slate-400 text-sm">Higher difficulty yields more XP.</p>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-800 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                  </div>
                  <p className="mt-6 text-slate-400 font-medium animate-pulse">Generating dynamic questions...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {difficulties.map((diff) => (
                    <button 
                      key={diff.level} 
                      onClick={() => selectDifficulty(diff.level)} 
                      className="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-2xl p-5 transition-all group"
                    >
                      <span className="font-bold text-lg text-white">{diff.level}</span>
                      <span className="text-xs font-bold bg-slate-900 text-emerald-400 px-3 py-1.5 rounded-lg group-hover:bg-emerald-500/10">+{diff.points} XP</span>
                    </button>
                  ))}
                </div>
              )}
              
              {error && !loading && (
                <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                  <p className="text-sm text-rose-400 mb-3">{error}</p>
                  <button onClick={() => setStage('topic')} className="text-xs font-bold text-white bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700">Go Back</button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {stage === 'quiz' && currentQuestion && (
          <div className="w-full max-w-3xl">
            {/* Progress & Timer Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</div>
                <div className={`flex items-center gap-1.5 text-sm font-bold ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`}>
                  <Clock size={16} /> {timeLeft}s
                </div>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500 rounded-full" 
                  initial={{ width: `${(currentIndex / questions.length) * 100}%` }}
                  animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl mb-6 relative overflow-hidden"
            >
              <h2 className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8">
                {currentQuestion.question}
              </h2>

              <div className="grid gap-3">
                {currentQuestion.options?.map((optionText, index) => {
                  const letter = ['A', 'B', 'C', 'D'][index] || String.fromCharCode(65 + index);
                  const isSelected = selected === index;
                  const correctIndex = currentQuestion.correct ?? currentQuestion.answer;
                  const isCorrect = isSelected && index === correctIndex;
                  const wrongSelected = isSelected && index !== correctIndex;
                  const showCorrect = answered && index === correctIndex;
                  
                  let stateClasses = "bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300";
                  let icon = null;

                  if (answered) {
                    if (isCorrect || showCorrect) {
                      stateClasses = "bg-emerald-500/10 border-emerald-500/30 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                      icon = <CheckCircle2 size={20} className="text-emerald-500" />;
                    } else if (wrongSelected) {
                      stateClasses = "bg-rose-500/10 border-rose-500/30 text-rose-100";
                      icon = <XCircle size={20} className="text-rose-500" />;
                    } else {
                      stateClasses = "bg-slate-900 border-slate-800 text-slate-600 opacity-50";
                    }
                  }

                  return (
                    <button 
                      key={index} 
                      onClick={() => handleAnswer(index)} 
                      disabled={answered} 
                      className={`w-full flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all text-left ${stateClasses}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${showCorrect || isCorrect ? 'bg-emerald-500/20 text-emerald-400' : wrongSelected ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-400'}`}>
                          {letter}
                        </span>
                        <span className="text-[15px] leading-relaxed">{optionText}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Feedback Panel */}
            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 overflow-hidden"
                >
                  <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${feedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {feedback.isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm">{feedback.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <button 
                  onClick={nextQuestion} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
                >
                  {currentIndex + 1 === questions.length ? 'View Final Results' : 'Next Question'} <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full text-center">
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
              
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Trophy size={48} className="text-emerald-400" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
              <p className="text-slate-400 text-sm mb-8">You finished the {topic} module.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Score</div>
                  <div className="text-3xl font-extrabold text-white">{score}/{questions.length}</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">XP Earned</div>
                  <div className="text-3xl font-extrabold text-emerald-400">+{xp}</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button onClick={() => setStage('topic')} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                  Play Another Quiz
                </button>
                <Link href="/dashboard" className="w-full bg-slate-800 text-slate-300 py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors">
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
