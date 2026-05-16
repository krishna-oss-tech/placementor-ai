'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, FileText, Building2, TrendingUp, Lock } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const features = [
  { icon: <Brain size={24} />, title: "AI Mock Interview", desc: "Practice HR, Technical & Aptitude rounds", href: "/interview", free: true },
  { icon: <FileText size={24} />, title: "Resume Analyzer", desc: "Get ATS score & instant fixes", href: "/resume", free: false },
  { icon: <Building2 size={24} />, title: "Company Prep", desc: "TCS, Infosys, Wipro & more", href: "/company", free: false },
  { icon: <TrendingUp size={24} />, title: "Progress Tracker", desc: "Track your improvement daily", href: "/progress", free: true },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);
      const name = user.displayName || user.email || '';
      const first = name.split(' ')[0] || 'there';
      setFirstName(first);
    });

    return () => unsubscribe();
  }, [router]);

  const handleUpgrade = async () => {
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
      handler: function(response) {
        alert('Payment Successful! Welcome to Pro!');
      },
      prefill: {
        name: user?.displayName || '',
        email: user?.email || ''
      },
      theme: { color: '#4f46e5' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-indigo-600">PlaceMentor AI</span>
        <div className="bg-indigo-50 text-indigo-600 text-sm px-4 py-1 rounded-full">
          Free Plan
        </div>
      </div>

      {/* Welcome */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-4">
        <h1 className="text-2xl font-bold mb-1">
          Welcome back{firstName ? `, ${firstName}` : ''}! 👋
        </h1>
        <p className="text-gray-500">Ready to crack your placement today?</p>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Interviews Done", value: "0" },
            { label: "Current Streak", value: "0 days" },
            { label: "Avg Score", value: "-- %" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-semibold text-lg mb-4">What do you want to practice?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <a key={i} href={f.free ? f.href : '#'} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-indigo-200 hover:shadow-sm transition-all flex items-start gap-4">
              <div className="text-indigo-600 mt-1">{f.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{f.title}</h3>
                  {!f.free && <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full flex items-center gap-1"><Lock size={10} /> Pro</span>}
                </div>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="max-w-4xl mx-auto px-6 mt-8 mb-10">
        <div className="bg-indigo-600 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-lg">Upgrade to Pro — ₹199/month</h3>
            <p className="text-indigo-200 text-sm mt-1">Unlimited interviews, resume review & company-specific prep</p>
          </div>
          <button onClick={handleUpgrade} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 whitespace-nowrap">
            Upgrade Now
          </button>
        </div>
      </div>

    </main>
  );
}