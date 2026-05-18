'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Menu, X, Play, FileText, Building2, BrainCircuit, Activity, ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const problems = [
    { title: "Resume shortlisted hi nahi ho raha?", desc: "You apply to 50 companies but hear back from none because your resume doesn't pass ATS." },
    { title: "Interview me blank ho jaate ho?", desc: "You know the answer, but when the interviewer asks, anxiety kicks in and you forget everything." },
    { title: "DSA aata hai but bol nahi paate?", desc: "Writing code is easy, but explaining your logic to an interviewer feels impossible." },
  ];

  const features = [
    { icon: <BrainCircuit size={24} />, title: 'AI Mock Interviews', desc: 'Realistic HR & Technical rounds with dynamic follow-up questions tailored to your answers.' },
    { icon: <FileText size={24} />, title: 'ATS Resume Analyzer', desc: 'Get an instant ATS score, missing keywords, and actionable fixes to ensure you get shortlisted.' },
    { icon: <Building2 size={24} />, title: 'Company-Specific Prep', desc: 'Target exact interview patterns for TCS, Infosys, Wipro, Accenture, and more.' },
    { icon: <Activity size={24} />, title: 'Placement Readiness Score', desc: 'Track your communication confidence and overall interview readiness with detailed analytics.' },
  ];

  const faqs = [
    { q: "How accurate is the AI feedback?", a: "Our AI is fine-tuned specifically on Indian placement scenarios, ensuring the feedback on your communication, technical accuracy, and confidence is highly realistic." },
    { q: "Can I use it for free?", a: "Yes! You get 3 free AI mock interviews every single day to start your practice. You can upgrade to Pro for unlimited access." },
    { q: "Will this help me if my English is weak?", a: "Absolutely. The AI acts as a judgment-free mentor, helping you structure your thoughts and improve your speaking confidence step-by-step." },
    { q: "Is the resume analyzer actually good?", a: "We simulate real Applicant Tracking Systems (ATS) to show you exactly why your resume might be getting rejected and how to fix it." }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Placementor <span className="text-indigo-600">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#problems" className="hover:text-indigo-600 transition-colors">The Problem</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-all">
              Start Free Trial
            </Link>
          </div>
          <button className="md:hidden text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-4 shadow-lg md:hidden">
            <a href="#problems" onClick={() => setMenuOpen(false)} className="text-slate-600 font-medium py-2">The Problem</a>
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-slate-600 font-medium py-2">Features</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-slate-600 font-medium py-2">Pricing</a>
            <hr className="border-slate-100" />
            <Link href="/login" className="text-slate-600 font-medium py-2">Log in</Link>
            <Link href="/dashboard" className="bg-indigo-600 text-white text-center rounded-xl py-3 font-medium">Start Free Trial</Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-white to-white -z-10" />
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-8 backdrop-blur-sm">
            <Sparkles size={16} className="text-indigo-500" />
            <span>Built for Indian Engineering Students</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Beat Interview Fear with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Realistic AI Mock Interviews</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your personal AI placement mentor. Practice HR & Technical rounds, get instant ATS resume analysis, and receive actionable feedback to get hired faster.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-base font-medium text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all">
              Start Mock Interview <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-8 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <FileText size={18} className="text-slate-400" /> Analyze My Resume
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-16 flex flex-col items-center gap-4 text-sm font-medium text-slate-500">
            <p>Trusted by placement aspirants</p>
            <div className="flex items-center gap-8 opacity-60 grayscale">
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-slate-300 rounded-md"></div><span>TCS Prep</span></div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-slate-300 rounded-md"></div><span>Infosys Prep</span></div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-slate-300 rounded-md"></div><span>Wipro Prep</span></div>
              <div className="hidden sm:flex items-center gap-2"><div className="w-6 h-6 bg-slate-300 rounded-md"></div><span>Accenture Prep</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-12 border-y border-slate-200 bg-white px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">1200+</div>
              <div className="text-sm font-medium text-slate-500">Interviews Practiced</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">92%</div>
              <div className="text-sm font-medium text-slate-500">Improved Confidence</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">37%</div>
              <div className="text-sm font-medium text-slate-500">Avg ATS Score Boost</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">24/7</div>
              <div className="text-sm font-medium text-slate-500">AI Mentor Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problems" className="py-24 bg-slate-900 text-white px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Placement prep feels confusing.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">You've studied hard, learned DSA, and built projects. But when the actual placement day arrives, things go wrong.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((prob, i) => (
              <motion.div key={i} initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn} className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm hover:bg-slate-800 transition-colors">
                <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mb-6">
                  <X size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{prob.title}</h3>
                <p className="text-slate-400 leading-relaxed">{prob.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Showcase Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn}>
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-6">
                The Solution
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Practice in a safe space. <br/> <span className="text-indigo-600">Crack the real thing.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Placementor AI creates a realistic interview environment where you can stumble, make mistakes, and learn without judgment. Get instant, objective feedback on your communication and technical accuracy.
              </p>
              
              <ul className="space-y-5 mb-10">
                {[
                  "Start an HR or Technical Mock Interview instantly",
                  "Speak naturally, just like a real interview",
                  "Get deep feedback on confidence and clarity",
                  "Improve your weak areas before the actual placement"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 text-indigo-600 bg-indigo-50 rounded-full p-1"><CheckCircle size={16} /></div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20">
                Try a Mock Interview <Play size={16} className="fill-current" />
              </Link>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-violet-50 rounded-[2.5rem] transform rotate-3 scale-105 -z-10" />
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[500px]">
                <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="ml-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Interview Room</div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-4 bg-[url('/noise.png')]">
                  <div className="self-start max-w-[85%] bg-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-slate-700 border border-slate-200 shadow-sm">
                    <p className="font-semibold text-slate-900 mb-1 text-xs">AI Interviewer</p>
                    Tell me about a time you faced a difficult bug in your project. How did you resolve it?
                  </div>
                  <div className="self-end max-w-[85%] bg-indigo-600 rounded-2xl rounded-tr-sm px-5 py-4 text-sm text-white shadow-sm">
                    In my final year project, we had a weird memory leak... I used Chrome DevTools to trace it back to an unclosed WebSocket connection.
                  </div>
                  
                  {/* Feedback UI Mock */}
                  <div className="mt-auto bg-white border border-indigo-100 rounded-2xl p-4 shadow-lg shadow-indigo-100/50 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Instant Feedback</div>
                      <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        Score: 8/10
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">Great structural answer! You clearly stated the problem and the specific tool (DevTools) used to fix it. Next time, briefly mention the impact of the fix to sound more impactful.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50 px-6 border-y border-slate-200">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Everything you need to get placed.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">A highly focused suite of tools designed exclusively for Indian campus placements.</p>
          </div>
          
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6">
            {features.map((feat, i) => (
              <motion.div key={i} variants={fadeIn} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Don't just take our word for it.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">See how engineering students are transforming their placement journey.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "My English isn't great, so I used to freeze in interviews. The AI mentor's judgment-free feedback completely changed my confidence level. Got placed in TCS!", name: "Rahul S.", role: "B.Tech CSE" },
              { text: "The Resume Analyzer is brutally honest. It pointed out missing keywords that my college seniors missed. Finally started getting shortlists after fixing it.", name: "Priya M.", role: "B.E. IT" },
              { text: "Company-specific prep is a game changer. The AI asked me the exact pattern of tricky situational questions that Infosys actually asks.", name: "Aditya K.", role: "B.Tech ECE" }
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="flex gap-1 mb-6 text-amber-400">
                  <Star size={18} className="fill-current" /><Star size={18} className="fill-current" /><Star size={18} className="fill-current" /><Star size={18} className="fill-current" /><Star size={18} className="fill-current" />
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-slate-900 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Invest in your career.</h2>
          <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto">Simple, transparent pricing. Designed for students, powerful enough to land you the job.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            {/* Free Tier */}
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">Perfect for getting started and testing the platform.</p>
              <div className="text-4xl font-extrabold mb-8">₹0<span className="text-lg text-slate-500 font-normal">/forever</span></div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {['3 AI mock interviews per day', 'Basic Aptitude Quizzes', 'Progress Tracking', 'Standard AI models'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle size={18} className="text-indigo-400" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="w-full block text-center bg-slate-700 hover:bg-slate-600 text-white py-3.5 rounded-xl font-semibold transition-colors">
                Start Free
              </Link>
            </div>
            
            {/* Pro Tier */}
            <div className="bg-indigo-600 rounded-3xl p-8 border border-indigo-500 relative flex flex-col shadow-2xl shadow-indigo-900/50 transform md:-translate-y-4">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-amber-400 text-amber-950 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Student Offer
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Pro Plan</h3>
              <p className="text-indigo-200 text-sm mb-6 h-10">Unlock maximum potential and unlimited practice.</p>
              <div className="flex items-end gap-2 mb-8">
                <div className="text-4xl font-extrabold text-white">₹199</div>
                <div className="text-lg text-indigo-200 mb-1">/month</div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited Mock Interviews', 'Deep ATS Resume Analysis', 'Company-Specific Preparation', 'Advanced Confidence Analytics', 'Premium Support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white text-sm">
                    <CheckCircle size={18} className="text-indigo-200" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="w-full block text-center bg-white text-indigo-600 hover:bg-indigo-50 py-3.5 rounded-xl font-semibold transition-colors shadow-sm">
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <ChevronDown size={20} className={`text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-indigo-600" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3" />
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Stop stressing. Start practicing.</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of engineering students who are already using AI to crack their dream companies.
          </p>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-indigo-700 shadow-xl hover:scale-105 transition-transform duration-300">
            Get Started For Free <ArrowRight size={18} />
          </Link>
          <p className="mt-4 text-indigo-200 text-sm">No credit card required for the free plan.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-6 border-t border-slate-900">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-xs">P</div>
            <span className="text-lg font-bold text-white tracking-tight">Placementor AI</span>
          </div>
          <div className="text-slate-400 text-sm">
            © 2026 Placementor AI. Built for Indian Engineers.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
