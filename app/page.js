'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Briefcase, CheckCircle, ShieldCheck, Star, Menu, X } from 'lucide-react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    { icon: <Star size={24} className="text-indigo-600" />, title: 'Mock Interviews', desc: 'Practice HR, technical and aptitude rounds with feedback tailored to your performance.' },
    { icon: <CheckCircle size={24} className="text-indigo-600" />, title: 'Resume Review', desc: 'Get ATS-ready suggestions and instant fixes to make your resume placement-ready.' },
    { icon: <Briefcase size={24} className="text-indigo-600" />, title: 'Company Prep', desc: 'Target interview patterns for TCS, Infosys, Wipro and other top recruiters.' },
    { icon: <ShieldCheck size={24} className="text-indigo-600" />, title: 'Skill Tracking', desc: 'Monitor your progress with daily streaks, strengths, and areas to improve.' },
  ];

  const steps = [
    { step: '1', title: 'Sign Up Free', desc: 'Create your account and access the AI prep dashboard instantly.' },
    { step: '2', title: 'Practice Daily', desc: 'Take mock interviews, quizzes and resume checks every day.' },
    { step: '3', title: 'Crack Placements', desc: 'Build confidence, improve scores and interview with clarity.' },
  ];

  const testimonials = [
    { quote: 'PlaceMentor AI made my preparation simple and focused. I cleared the TCS interview in just 3 weeks!', name: 'Ananya Sharma', college: 'NIT Calicut', company: 'TCS' },
    { quote: 'The resume feedback and mock interviews helped me stand out during the Infosys process.', name: 'Ritik Patel', college: 'VNIT Nagpur', company: 'Infosys' },
    { quote: 'I am more confident now and my communication improved a lot before my Wipro interview.', name: 'Sneha Iyer', college: 'VIT Vellore', company: 'Wipro' },
  ];

  const pricing = [
    { name: 'Free', price: '\u20B90', period: 'Forever', features: ['3 mock interviews/day', 'Basic quizzes', 'Resume score'], highlight: false },
    { name: 'Pro', price: '\u20B9199', period: 'per month', features: ['Unlimited interviews', 'Resume review', 'Company-specific prep', 'Progress tracking'], highlight: true },
    { name: 'Premium', price: '\u20B9499', period: 'per month', features: ['Weekly study plan', 'Priority support', 'Interview recordings', '1:1 mentor session'], highlight: false },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a href="/" className="text-lg font-bold text-indigo-600">PlaceMentor AI</a>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#work" className="hover:text-indigo-600">How it works</a>
            <a href="#testimonials" className="hover:text-indigo-600">Testimonials</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
          </div>
          <a href="/dashboard" className="hidden md:inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">
            Get Started
          </a>
          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-3 px-2 pb-4 text-sm text-gray-600 md:hidden">
            <a href="#features" className="block rounded-2xl px-4 py-3 hover:bg-gray-100">Features</a>
            <a href="#work" className="block rounded-2xl px-4 py-3 hover:bg-gray-100">How it works</a>
            <a href="#testimonials" className="block rounded-2xl px-4 py-3 hover:bg-gray-100">Testimonials</a>
            <a href="#pricing" className="block rounded-2xl px-4 py-3 hover:bg-gray-100">Pricing</a>
            <a href="/dashboard" className="block rounded-2xl bg-indigo-600 px-4 py-3 text-center text-white hover:bg-indigo-700">Get Started</a>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden bg-white pt-28 pb-20 px-6">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-700 mb-6">
              Join early access — free for engineering students
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              AI-powered prep for real placement success.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Practice mock interviews, polish your resume, and build confidence with intelligent feedback designed for Indian campus placements.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700">
                Start Preparing <ArrowRight size={18} />
              </a>
              <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50">
                See Features <ArrowUpRight size={18} />
              </a>
            </div>

          </div>

          <div className="relative">
            <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-gray-200 bg-gradient-to-br from-indigo-600 to-indigo-500 p-1 shadow-2xl">
              <div className="rounded-[1.75rem] bg-white p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Live demo</p>
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">Interview review dashboard</h2>
                  </div>
                  <div className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">Beta</div>
                </div>
                <div className="h-[420px] rounded-[1.5rem] bg-gradient-to-br from-gray-100 via-white to-gray-100 p-5 shadow-inner">
                  <div className="h-full rounded-[1.25rem] border border-dashed border-gray-300 bg-white p-6 text-center text-gray-400">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                      <Star size={32} />
                    </div>
                    <p className="text-xl font-semibold">Demo screenshot</p>
                    <p className="mt-2 text-sm text-gray-500">Preview of the AI prep experience</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -left-6 top-10 h-24 w-24 rounded-full bg-indigo-100 opacity-70 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-10 h-24 w-24 rounded-full bg-indigo-100 opacity-70 blur-3xl" />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Core benefits</p>
              <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need to stay ahead of campus placement preparation.</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">From mock interviews to resume reviews and company-specific practice, get a complete toolkit that helps you improve fast.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-3 text-gray-600 leading-7">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="py-20 bg-indigo-600 px-6 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-200">How it works</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Three steps to placement confidence.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-sm backdrop-blur-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-700 font-bold">{step.step}</div>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-gray-100 leading-7">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Be among the first to try PlaceMentor AI — and share your experience!
          </h2>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Pricing</p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Plans designed for every stage of preparation.</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Choose the right plan to practice confidently and sharpen your skills before placement season.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className={`rounded-3xl border p-8 shadow-sm ${plan.highlight ? 'border-indigo-300 bg-white' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                  {plan.highlight && <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Popular</span>}
                </div>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>
                <ul className="mt-8 space-y-4 text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle size={18} className="mt-1 text-indigo-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/dashboard" className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${plan.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-gray-200 bg-white text-gray-900 hover:bg-gray-50'}`}>
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-indigo-600 px-8 py-16 text-white shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-200">Ready to start?</p>
              <h2 className="mt-4 text-4xl font-bold">Start preparing today.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-indigo-100">Get instant access to AI-powered placement practice, realistic interview scenarios, and resume guidance that helps you perform better, faster.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-indigo-700 shadow-lg hover:bg-gray-100">
                Start Free Today <ArrowRight size={18} />
              </a>
              <div className="rounded-3xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-indigo-100">
                <p className="font-semibold">Fast setup</p>
                <p className="mt-1">Begin your prep in under 2 minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2026 PlaceMentor AI • Made with ❤️ for Indian Engineers
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/terms" className="hover:text-gray-600">Terms of Service</a>
            <a href="/privacy" className="hover:text-gray-600">Privacy Policy</a>
            <a href="mailto:support@placementorai.in" className="hover:text-gray-600">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
