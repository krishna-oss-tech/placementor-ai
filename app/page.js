'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Menu, X, Play, FileText, Building2, BrainCircuit, Activity, ChevronDown, Sparkles, Trophy } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
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
    { title: "Not Getting Shortlisted Despite Applying Everywhere?", desc: "You apply to 50 companies but hear back from none because your resume doesn't pass ATS." },
    { title: "Forget Everything During Interviews?", desc: "You know the answer, but when the interviewer asks, anxiety kicks in and you forget everything." },
    { title: "Good at Coding but Struggle to Explain Your Thinking?", desc: "Writing code is easy, but explaining your logic to an interviewer feels impossible." },
  ];

  const features = [
    { icon: <BrainCircuit size={24} />, title: 'AI Mock Interviews', desc: 'Realistic HR & Technical rounds with dynamic follow-up questions tailored to your answers.' },
    { icon: <FileText size={24} />, title: 'ATS Resume Analyzer', desc: 'Get an instant ATS score, missing keywords, and actionable fixes to ensure you get shortlisted.' },
    { icon: <Building2 size={24} />, title: 'Company-Specific Prep', desc: 'Target exact interview patterns for TCS, Infosys, Wipro, Accenture, and more.' },
    { icon: <Activity size={24} />, title: 'Placement Readiness Score', desc: 'Track your communication confidence and overall interview readiness with detailed analytics.' },
  ];

  const faqs = [
    { q: "How accurate is the AI feedback?", a: "Our AI is fine-tuned specifically on Indian placement scenarios, ensuring the feedback on your communication, technical accuracy, and confidence is highly realistic." },
    { q: "Can I use it for free?", a: "Yes! You get free daily AI mock interviews, basic aptitude quizzes, and progress tracking without paying anything." },
    { q: "Will this help me if my English is weak?", a: "Absolutely. The AI acts as a judgment-free mentor, helping you structure your thoughts and improve your speaking confidence step-by-step." },
    { q: "Is the resume analyzer actually good?", a: "We simulate real Applicant Tracking Systems (ATS) to show you exactly why your resume might be getting rejected and how to fix it." }
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">P</div>
            <span className="text-xl font-bold text-white tracking-tight">Placementor <span className="text-indigo-400">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#problems" className="hover:text-white transition-colors">The Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Log in</Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all">
              Start Free Trial
            </Link>
          </div>
          <button className="md:hidden text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col gap-4 shadow-2xl md:hidden z-50">
            <a href="#problems" onClick={() => setMenuOpen(false)} className="text-slate-300 font-medium py-2">The Problem</a>
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-slate-300 font-medium py-2">Features</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-slate-300 font-medium py-2">Pricing</a>
            <hr className="border-slate-800" />
            <Link href="/login" className="text-slate-300 font-medium py-2">Log in</Link>
            <Link href="/dashboard" className="bg-indigo-600 text-white text-center rounded-xl py-3 font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)]">Start Free Trial</Link>
          </motion.div>
        )}
      </nav>

      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0B0F19] to-[#0B0F19] -z-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-bold text-indigo-300 mb-8 backdrop-blur-sm">
              <Sparkles size={16} className="text-indigo-400" />
              <span>Next-Gen AI Placement Operating System</span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Beat Interview Fear with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Intelligent AI Mock Sessions</span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your personal AI placement mentor. Practice HR & Technical rounds, get instant ATS resume analysis, and receive actionable feedback to get hired faster.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-base font-bold text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all">
                Start Mock Interview <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-8 py-4 text-base font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-sm">
                <FileText size={18} className="text-slate-400" /> Analyze My Resume
              </Link>
            </motion.div>
          </div>

          {/* Immersive Dashboard Preview Mockup */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-20 relative mx-auto max-w-5xl" style={{ perspective: '1000px' }}>
            <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-xl p-2 shadow-2xl shadow-indigo-900/20 transform rotate-x-2 hover:rotate-x-0 transition-transform duration-700">
              <div className="rounded-2xl overflow-hidden border border-slate-800/50 bg-[#0B0F19] flex shadow-inner">
                {/* Mockup Sidebar */}
                <div className="w-56 hidden md:block border-r border-slate-800/50 p-5 bg-slate-950/50">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><div className="w-3 h-3 bg-white rounded-sm"></div></div>
                     <div className="h-4 w-24 bg-slate-800 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    {[1,2,3,4].map(i => <div key={i} className="h-10 w-full bg-slate-800/30 rounded-xl"></div>)}
                  </div>
                </div>
                {/* Mockup Main Area */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <div className="h-6 w-48 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-slate-700 rounded"></div>
                    </div>
                    <div className="h-10 w-28 bg-indigo-500/10 rounded-full border border-indigo-500/20"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[1,2,3,4].map(i => <div key={i} className="h-28 bg-slate-900/80 border border-slate-800 rounded-2xl"></div>)}
                  </div>
                  {/* Mock Chat / Interview Room */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-56 relative overflow-hidden flex flex-col justify-end">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 pointer-events-none"></div>
                    
                    <div className="flex items-start gap-4 mb-4 relative z-0">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center"><BrainCircuit size={14} className="text-indigo-400" /></div>
                      <div className="px-4 py-3 bg-slate-800 rounded-2xl rounded-tl-sm text-sm text-slate-300 w-3/4">Tell me about a time you optimized a piece of code.</div>
                    </div>
                    <div className="flex items-start gap-4 flex-row-reverse relative z-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0"></div>
                      <div className="px-4 py-3 bg-indigo-600 rounded-2xl rounded-tr-sm text-sm text-white w-1/2">In my final project, I noticed the API was taking 3 seconds to load...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 md:-right-12 top-1/4 bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Confidence +15%</div>
                <div className="text-xs text-slate-400">Communication improved</div>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 md:-left-12 bottom-1/4 bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                <Activity size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Top 10%</div>
                <div className="text-xs text-slate-400">Placement Readiness</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Company Prep Section */}
      <section className="py-24 px-6 bg-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-400 mb-6 border border-blue-500/20">
              Company-Specific Preparation
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Targeted Prep for Dream Companies.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Don&apos;t guess what they&apos;ll ask. Our AI mimics the exact interview patterns and aptitude questions of top tech giants.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "TCS", desc: "NQT Aptitude & Technical", color: "blue" },
              { name: "Infosys", desc: "Pseudocode & HR Round", color: "emerald" },
              { name: "Wipro", desc: "Elite Coding & Logic", color: "purple" },
              { name: "Accenture", desc: "Communication & Technical", color: "rose" }
            ].map((company, i) => (
              <Link href="/company" key={i} className="group relative bg-slate-900 border border-slate-800 p-6 rounded-3xl overflow-hidden hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${company.color}-500/10 blur-3xl rounded-full group-hover:bg-${company.color}-500/20 transition-all`}></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 text-${company.color}-400 border border-slate-700 group-hover:scale-110 transition-transform shadow-inner`}>
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{company.name}</h3>
                  <p className="text-sm text-slate-400 mb-6 flex-1">{company.desc}</p>
                  <div className={`flex items-center text-sm font-bold text-slate-500 group-hover:text-${company.color}-400 transition-colors`}>
                    Start Prep <ArrowRight size={16} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Philosophy Section */}
      <section className="py-12 border-y border-slate-800 bg-slate-900 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800">
            <div className="text-center px-4">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">Built for Students</div>
              <div className="text-sm font-medium text-slate-400">Focused on Indian Placements</div>
            </div>
            <div className="text-center px-4">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">Early Access</div>
              <div className="text-sm font-medium text-slate-400">Improving actively</div>
            </div>
            <div className="text-center px-4">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">AI-Powered</div>
              <div className="text-sm font-medium text-slate-400">Instant actionable feedback</div>
            </div>
            <div className="text-center px-4">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">Practice Daily</div>
              <div className="text-sm font-medium text-slate-400">Build confidence slowly</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problems" className="py-24 bg-[#0B0F19] text-white px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Placement prep feels confusing.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">You&apos;ve studied hard, learned DSA, and built projects. But when the actual placement day arrives, things go wrong.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((prob, i) => (
              <motion.div key={i} initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-colors shadow-lg">
                <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20">
                  <X size={24} />
             </div>
                <h3 className="text-xl font-bold mb-3 text-white">{prob.title}</h3>
                <p className="text-slate-400 leading-relaxed">{prob.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Showcase Section */}
      <section className="py-24 px-6 overflow-hidden bg-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn}>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-6">
                The Solution
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                Practice in a safe space. <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Crack the real thing.</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
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
                    <div className="mt-1 text-emerald-400 bg-emerald-500/10 rounded-full p-1"><CheckCircle size={16} /></div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                Try a Mock Interview <Play size={16} className="fill-current" />
              </Link>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-[2.5rem] transform rotate-3 scale-105 -z-10 blur-xl" />
              <div className="bg-slate-900 rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[500px]">
                <div className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="ml-4 text-xs font-bold text-slate-500 uppercase tracking-wider">AI Interview Room</div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-4 relative overflow-hidden bg-[url('/noise.png')] opacity-90">
                  <div className="self-start max-w-[85%] bg-slate-800 rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-slate-300 border border-slate-700 shadow-sm relative z-10">
                    <p className="font-bold text-emerald-400 mb-1 text-xs">AI Interviewer</p>
                    Tell me about a time you faced a difficult bug in your project. How did you resolve it?
                  </div>
                  <div className="self-end max-w-[85%] bg-indigo-600 rounded-2xl rounded-tr-sm px-5 py-4 text-sm text-white shadow-sm relative z-10">
                    In my final year project, we had a weird memory leak... I used Chrome DevTools to trace it back to an unclosed WebSocket connection.
                  </div>
                  
                  {/* Feedback UI Mock */}
                  <div className="mt-auto bg-slate-950 border border-emerald-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden z-10">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Instant Feedback</div>
                      <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                        Score: 8/10
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">Great structural answer! You clearly stated the problem and the specific tool (DevTools) used to fix it. Next time, briefly mention the impact of the fix to sound more impactful.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-[#0B0F19] px-6 border-y border-slate-800">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Everything you need to get placed.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">A highly focused suite of tools designed exclusively for Indian campus placements.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div key={i} initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/30 transition-colors group">
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-indigo-500/20">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Don&apos;t just take our word for it.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">See how engineering students are transforming their placement journey.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "I used to freeze during HR rounds. The AI feedback helped me structure my thoughts. Just got selected at TCS!", author: "Rahul M.", college: "Tier-3 Engineering College" },
              { text: "The resume ATS scanner is a lifesaver. Found out I was missing key tech words. Fixed it and got 2 interview calls in a week.", author: "Priya S.", college: "CS Student" },
              { text: "Practicing the Infosys specific questions gave me a huge confidence boost before the actual test. Highly recommend the Pro plan.", author: "Aditya K.", college: "Final Year IT" }
            ].map((review, i) => (
              <motion.div key={i} initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeIn} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-lg relative">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 mb-6 text-sm leading-relaxed">&quot;{review.text}&quot;</p>
                <div>
                  <div className="font-bold text-white">{review.author}</div>
                  <div className="text-xs text-slate-500">{review.college}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#0B0F19] border-t border-slate-800">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Start for free. Upgrade when ready.</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">No hidden fees. A simple, affordable plan designed for students.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Free Starter</h3>
              <p className="text-slate-400 text-sm mb-6">Perfect to try out the platform</p>
              <div className="text-4xl font-extrabold text-white mb-8">₹0<span className="text-lg font-normal text-slate-500">/forever</span></div>
              <Link href="/dashboard" className="block w-full bg-slate-800 text-center text-white py-4 rounded-2xl font-bold hover:bg-slate-700 transition-colors mb-8">Get Started</Link>
              <ul className="space-y-4">
                {[
                  "Limited daily AI mock interviews",
                  "Basic Aptitude quizzes",
                  "Progress tracking",
                  "Basic AI feedback"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle size={18} className="text-slate-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Pro Tier */}
            <div className="bg-gradient-to-b from-indigo-600 to-indigo-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden border border-indigo-500/50 transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-[2.5rem]">RECOMMENDED</div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Prep</h3>
              <p className="text-indigo-200 text-sm mb-6">Everything you need to crack the job</p>
              <div className="text-4xl font-extrabold text-white mb-8">₹199<span className="text-lg font-normal text-indigo-300">/month</span></div>
              <Link href="/dashboard" className="block w-full bg-white text-center text-indigo-700 py-4 rounded-2xl font-bold hover:bg-indigo-50 shadow-lg transition-colors mb-8">Upgrade to Pro</Link>
              <ul className="space-y-4">
                {[
                  "Unlimited AI mock interviews",
                  "Advanced Company-specific prep",
                  "ATS Resume Analyzer",
                  "Detailed AI communication insights",
                  "Priority support"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white">
                    <CheckCircle size={18} className="text-indigo-300 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all hover:border-slate-700">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-white">{faq.q}</span>
                  <ChevronDown className={`text-slate-500 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} size={20} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0F19] pt-16 pb-8 border-t border-slate-800 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
                <span className="text-xl font-bold text-white tracking-tight">Placementor <span className="text-indigo-400">AI</span></span>
              </Link>
              <p className="text-slate-500 text-sm max-w-xs">AI-powered placement preparation for engineering students in India.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Mock Interviews</Link></li>
                <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Resume Analyzer</Link></li>
                <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Company Prep</Link></li>
                <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/support" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                <li><Link href="/support" className="hover:text-indigo-400 transition-colors">FAQs</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-slate-800 text-sm text-slate-600">
            © {new Date().getFullYear()} PlaceMentor AI. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
