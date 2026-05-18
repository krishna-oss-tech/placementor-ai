'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Target, TrendingUp, Flame, BrainCircuit, Activity, Zap, MessageSquare, Award, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgressPage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 mt-4 text-sm font-medium">Loading Analytics Engine...</p>
      </div>
    );
  }

  if (!user) return null;

  const totalInterviews = userData?.totalInterviews || 0;
  const streak = userData?.streak || 0;
  const readinessScore = Math.min(Math.round((totalInterviews * 5) + 30), 98); 
  const commScore = Math.min(Math.round((totalInterviews * 4) + 40), 92);
  const techScore = Math.min(Math.round((totalInterviews * 6) + 25), 89);
  
  const weeklyActivity = [
    { day: 'Mon', count: 0, height: 10 },
    { day: 'Tue', count: 1, height: 40 },
    { day: 'Wed', count: 0, height: 10 },
    { day: 'Thu', count: 2, height: 70 },
    { day: 'Fri', count: 0, height: 10 },
    { day: 'Sat', count: 1, height: 30 },
    { day: 'Sun', count: 3, height: 90 },
  ];

  const recentActivity = userData?.recentActivity || [];

  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="font-bold text-white flex items-center gap-2">
            <Activity size={18} className="text-indigo-400" />
            AI Progress Analytics
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {userData?.plan === 'pro' ? 'Pro Member' : 'Free Member'}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Top Metric Row */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Readiness Meter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-xl">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={120} /></div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 relative z-10">Placement Readiness</h2>
            
            <div className="relative w-40 h-40 flex items-center justify-center mb-4 z-10">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round"
                  initial={{ strokeDasharray: '0 283' }}
                  animate={{ strokeDasharray: `${(readinessScore / 100) * 283} 283` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-4xl font-extrabold text-white">{readinessScore}<span className="text-lg text-slate-500">%</span></div>
            </div>
            
            <p className="text-slate-400 text-sm relative z-10">You are in the <strong className="text-indigo-400">Top 24%</strong> of peers.</p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 grid grid-cols-2 gap-6">
            {[
              { title: "Total Interviews", value: totalInterviews, icon: <BrainCircuit size={20} className="text-blue-400" />, bg: "bg-blue-500/10", border: "border-blue-500/20" },
              { title: "Day Streak", value: streak, icon: <Flame size={20} className="text-orange-400" />, bg: "bg-orange-500/10", border: "border-orange-500/20" },
              { title: "Communication", value: `${commScore}/100`, icon: <MessageSquare size={20} className="text-emerald-400" />, bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
              { title: "Technical Score", value: `${techScore}/100`, icon: <Zap size={20} className="text-purple-400" />, bg: "bg-purple-500/10", border: "border-purple-500/20" }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.border} border flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <TrendingUp size={16} className="text-slate-600" />
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500">{stat.title}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row: Heatmap & AI Insights */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Weekly Activity Heatmap */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Consistency Tracker</h2>
                <p className="text-sm text-slate-500">Your interview frequency this week</p>
              </div>
              <div className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Flame size={14} className="text-orange-500" /> Active
              </div>
            </div>
            
            <div className="flex items-end justify-between h-48 gap-2">
              {weeklyActivity.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 flex-1 group">
                  <div className="w-full bg-slate-800/50 rounded-t-xl h-full flex items-end relative overflow-hidden hover:bg-slate-800 transition-colors">
                    <motion.div 
                      className="w-full bg-indigo-500 rounded-t-xl shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:bg-indigo-400 transition-colors"
                      initial={{ height: 0 }}
                      animate={{ height: `${item.height}%` }}
                      transition={{ duration: 1, delay: 0.3 + (i * 0.1) }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-500">{item.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights Engine */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                <Sparkles size={20} className="text-indigo-400" />
              </div>
              <h2 className="text-lg font-bold text-white">AI Insights</h2>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Strength</div>
                <p className="text-sm text-slate-300 leading-relaxed">Your technical explanation logic has improved by 15% this week. Keep structuring your answers using the STAR method.</p>
              </div>
              <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Area of Focus</div>
                <p className="text-sm text-slate-300 leading-relaxed">You pause frequently during HR situational questions. Practice the &quot;Aptitude Quiz&quot; verbal section to improve fluidity.</p>
              </div>
            </div>
            
            <button className="w-full mt-6 flex items-center justify-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              View Detailed Report <ChevronRight size={16} />
            </button>
          </motion.div>

        </div>

        {/* History Log */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Interview Log</h2>
              <p className="text-sm text-slate-500">Your most recent AI sessions</p>
            </div>
            <Award size={24} className="text-slate-700" />
          </div>

          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-5 rounded-2xl border border-slate-800/50 bg-slate-800/20 hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-colors">
                      <BrainCircuit size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm mb-1">{item.type}</h4>
                      <p className="text-xs font-medium text-slate-500">{item.date}</p>
                    </div>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-sm font-bold text-white shadow-sm">
                    {item.score || 'Completed'}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border border-slate-800 border-dashed rounded-2xl bg-slate-900/50">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                  <BrainCircuit size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No Interviews Yet</h3>
                <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">Your activity log is empty. Start your first mock interview to track your performance and generate AI insights.</p>
                <Link href="/interview" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                  Start Mock Interview
                </Link>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
