'use client';
import { useState } from 'react';
import { ArrowRight, Brain, FileText, Building2, TrendingUp, Star, Menu, X } from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50 px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-indigo-600">PlaceMentor AI</span>
        <div className="hidden md:flex gap-8 text-sm text-gray-600">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
        <a href="/dashboard" className="hidden md:block bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700">
          Get Started Free
        </a>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 w-full bg-white border-b border-gray-100 z-40 px-6 py-4 flex flex-col gap-4 text-sm text-gray-600">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="/dashboard" className="bg-indigo-600 text-white text-center px-4 py-2 rounded-lg">Get Started Free</a>
        </div>
      )}

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-indigo-50 text-indigo-600 text-sm px-4 py-1 rounded-full mb-6">
          🚀 India's #1 AI Placement Prep Platform
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Crack Your Dream<br />
          <span className="text-indigo-600">Placement</span> with AI
        </h1>
        <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          AI mock interviews, resume reviews, aptitude tests — all personalized for TCS, Infosys, Wipro & more. Built for tier-2 & tier-3 college students.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/dashboard" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2">
            Start Free Today <ArrowRight size={20} />
          </a>
          <a href="#features" className="border border-gray-200 px-8 py-4 rounded-xl text-lg text-gray-600 hover:bg-gray-50">
            See How It Works
          </a>
        </div>
        <p className="text-gray-400 text-sm mt-4">No credit card required • 3 free interviews daily</p>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything You Need to Get Placed</h2>
          <p className="text-gray-500 text-center mb-12">Powered by AI, built for Indian engineering students</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Brain size={28} />, title: "AI Mock Interviews", desc: "HR, Technical & Aptitude rounds with real-time feedback" },
              { icon: <FileText size={28} />, title: "Resume Analyzer", desc: "Get ATS score and exact fixes in 30 seconds" },
              { icon: <Building2 size={28} />, title: "Company-Specific Prep", desc: "TCS, Infosys, Wipro, Cognizant & more" },
              { icon: <TrendingUp size={28} />, title: "Progress Tracking", desc: "Daily streaks, weak area detection, improvement graph" },
            ].map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="text-indigo-600 mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-500 text-center mb-12">Start free, upgrade when you're ready</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Free", price: "₹0", period: "forever", features: ["3 mock interviews/day", "Basic aptitude tests", "Resume score"], cta: "Get Started", highlight: false },
              { name: "Pro", price: "₹199", period: "per month", features: ["Unlimited mock interviews", "Full resume review", "Company-specific prep", "Progress tracking"], cta: "Start Pro", highlight: true },
              { name: "Premium", price: "₹499", period: "per month", features: ["Everything in Pro", "Weekly AI study plan", "Priority support", "Interview recordings"], cta: "Go Premium", highlight: false },
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${plan.highlight ? 'border-indigo-600 bg-indigo-50' : 'border-gray-100 bg-white'}`}>
                {plan.highlight && <div className="text-indigo-600 text-xs font-semibold mb-2">⭐ MOST POPULAR</div>}
                <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold mb-1">{plan.price}</div>
                <div className="text-gray-400 text-sm mb-6">{plan.period}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <Star size={14} className="text-indigo-500" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="/dashboard" className={`block text-center py-3 rounded-xl font-medium ${plan.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-gray-200 hover:bg-gray-50'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © 2025 PlaceMentor AI • Made with ❤️ for Indian Engineers
      </footer>

    </main>
  );
}