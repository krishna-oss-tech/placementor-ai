'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, FileText, Building2, Activity, Lock, Zap, ChevronRight, LayoutDashboard, Settings, Trophy, Target, Sparkles, Clock, Flame } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [userPlan, setUserPlan] = useState('free');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        const rawName = currentUser.displayName || currentUser.email || '';
        const parts = rawName.split(' ').filter(Boolean);
        const honorifics = ['Mr', 'Ms', 'Mrs', 'Dr', 'Miss', 'Prof'];
        const first = parts.length > 1 && honorifics.includes(parts[0]) ? parts[1] : parts[0] || 'there';
        setFirstName(first);

        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          if (data.plan === 'pro') {
            setUserPlan('pro');
          }
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpgrade = async () => {
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 199, plan: 'pro' })
      });
      const data = await res.json();

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'PlaceMentor AI',
        description: 'Pro Plan - Monthly',
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const currentUser = auth.currentUser;
            if (currentUser) {
              await setDoc(doc(db, 'users', currentUser.uid), {
                plan: 'pro',
                email: currentUser.email,
                name: currentUser.displayName,
                upgradedAt: new Date().toISOString(),
                paymentId: response.razorpay_payment_id
              }, { merge: true });
              setUserPlan('pro');
              alert('Welcome to Pro! All features unlocked!');
              window.location.reload();
            }
          } catch (err) {
            alert('Payment successful! Please refresh.');
          }
        },
        prefill: {
          name: user?.displayName || '',
          email: user?.email || ''
        },
        theme: { color: '#4f46e5' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      alert("Error initiating payment. Please try again.");
    }
  };

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: <BrainCircuit size={20} />, label: 'Mock Interviews', href: '/interview', active: false },
    { icon: <FileText size={20} />, label: 'Resume Analyzer', href: '/resume', active: false, pro: false },
    { icon: <Building2 size={20} />, label: 'Company Prep', href: '/company', active: false, pro: false },
    { icon: <Activity size={20} />, label: 'Progress Analytics', href: '/progress', active: false },
    { icon: <Zap size={20} />, label: 'Aptitude Quiz', href: '/aptitude', active: false },
  ];

  const handleNavigation = (item) => {
    if (item.pro && userPlan !== 'pro') {
      setShowUpgradeModal(true);
    } else {
      router.push(item.href);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Derived Stats
  const totalInterviews = userData?.totalInterviews || 0;
  const streak = userData?.streak || 0;
  const xp = totalInterviews * 150 + streak * 50;
  const level = Math.floor(xp / 1000) + 1;
  const progressToNextLevel = (xp % 1000) / 10;
  const recentActivity = userData?.recentActivity || [];
  
  // Fake some insights based on actual usage for emotional connection
  const readinessScore = Math.min(Math.round((totalInterviews * 5) + 30), 98); 
  const aiMessage = totalInterviews === 0 
    ? "Welcome to your placement journey! Your first step is to take a Mock Interview." 
    : "You're getting closer to placement-ready 🚀 Keep your streak alive today!";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Placementor</span>
        </div>
        
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Menu</div>
          <div className="space-y-1">
            {navItems.map((item, i) => (
              <button 
                key={i}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${item.active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={item.active ? 'text-indigo-600' : 'text-slate-400'}>{item.icon}</span>
                  {item.label}
                </div>
                {item.pro && userPlan !== 'pro' && <Lock size={14} className="text-slate-300" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4">
          {userPlan !== 'pro' ? (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 text-white shadow-lg shadow-slate-900/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-amber-400" />
                <span className="font-semibold text-sm">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">Unlock ATS Resume Analyzer & Company Prep to secure your dream job.</p>
              <button onClick={handleUpgrade} className="w-full bg-white text-slate-900 text-xs font-bold py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                Get Pro — ₹199/mo
              </button>
            </div>
          ) : (
            <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                {firstName.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Pro Member</div>
                <div className="text-xs text-indigo-600 font-medium">All features unlocked</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
            <span className="text-xl font-bold text-slate-900">Placementor</span>
          </div>
          <div className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full">
            {userPlan === 'pro' ? 'PRO' : 'FREE'}
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-6 lg:p-10 space-y-8">
          
          {/* Welcome & Motivational Section */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                Welcome back, {firstName} 👋
              </h1>
              <p className="text-slate-500">{aiMessage}</p>
            </div>
            
            {/* Gamification Badge */}
            <div className="flex items-center gap-4 bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                <Trophy className="text-amber-500" size={24} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 w-32">
                  <span className="text-xs font-bold text-slate-700 uppercase">Level {level}</span>
                  <span className="text-xs font-medium text-slate-400">{xp} XP</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${progressToNextLevel}%` }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Analytics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={64} /></div>
              <div className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-2"><Activity size={16}/> Readiness</div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-slate-900">{readinessScore}</span>
                <span className="text-slate-400 font-medium mb-1">/100</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Flame size={64} /></div>
              <div className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-2"><Flame size={16} className={streak > 0 ? 'text-orange-500' : ''}/> Day Streak</div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-slate-900">{streak}</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-2"><BrainCircuit size={16}/> Interviews</div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-slate-900">{totalInterviews}</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-2"><Zap size={16}/> Plan</div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-extrabold text-indigo-600 capitalize">{userPlan}</span>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Your Training Plan</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: <BrainCircuit size={28} className="text-indigo-600" />, bg: 'bg-indigo-50', title: "Mock Interview", desc: "Practice answering HR & Tech questions under pressure.", href: "/interview", locked: false },
                { icon: <FileText size={28} className="text-emerald-600" />, bg: 'bg-emerald-50', title: "Resume Analyzer", desc: "Scan your resume against ATS and fix fatal errors instantly.", href: "/resume", locked: false },
                { icon: <Building2 size={28} className="text-blue-600" />, bg: 'bg-blue-50', title: "Company Prep", desc: "Target exactly what TCS, Infosys & others will ask you.", href: "/company", locked: false },
                { icon: <Zap size={28} className="text-amber-600" />, bg: 'bg-amber-50', title: "Aptitude Quiz", desc: "Sharpen your quant, logical and verbal reasoning skills.", href: "/aptitude", locked: false }
              ].map((card, i) => (
                <button
                  key={i}
                  onClick={() => handleNavigation(card)}
                  className="group text-left bg-white border border-slate-200 rounded-3xl p-6 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all flex flex-col sm:flex-row sm:items-center gap-5 relative overflow-hidden"
                >
                  <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <div className="flex-1 pr-8">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 text-lg">{card.title}</h3>
                      {card.locked && <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1"><Lock size={10}/> Pro</span>}
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="text-indigo-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Insights & Recent History */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock size={18} className="text-slate-400" /> Recent Activity
              </h2>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 shadow-sm">
                          <BrainCircuit size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{act.type}</p>
                          <p className="text-xs text-slate-500">{act.date}</p>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-sm">
                        {act.score || 'Completed'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 font-medium">No activity yet</p>
                  <p className="text-xs text-slate-400 mt-1">Take your first mock interview to see history.</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" /> AI Insights
              </h2>
              
              {totalInterviews > 0 ? (
                <div className="space-y-5">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
                    <div className="text-xs text-indigo-200 font-semibold uppercase tracking-wider mb-2">Communication</div>
                    <p className="text-sm leading-relaxed text-slate-100">You tend to use filler words when explaining technical logic. Try pausing instead of saying "um".</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
                    <div className="text-xs text-amber-200 font-semibold uppercase tracking-wider mb-2">Technical Strength</div>
                    <p className="text-sm leading-relaxed text-slate-100">Your structured approach to resolving bugs is excellent. Highlight the final impact more.</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-300 text-sm leading-relaxed">Complete an interview to receive personalized AI recommendations on your communication and confidence.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5"><Lock size={120} /></div>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 relative z-10">
              <Lock size={28} />
            </div>
            <div className="text-center relative z-10">
              <h2 className="text-2xl font-bold text-slate-900">Unlock Pro Features</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 px-4">
                Upgrade to Pro for just ₹199/month to access ATS Resume Analyzer, Company-Specific Prep, and Unlimited Practice.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 relative z-10">
              <button
                type="button"
                onClick={handleUpgrade}
                className="w-full rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 transition-colors"
              >
                Upgrade to Pro
              </button>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}