'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft, FileText, Loader, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { auth } from '../lib/firebase';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Resume() {
  const [resume, setResume] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState('free');
  const [authLoading, setAuthLoading] = useState(true);
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
        setUserPlan(userDoc.data().plan || 'free');
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const analyzeResume = async () => {
    if (!resume.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setResult(data);
    } catch (err) {
      alert(err.message || 'Something went wrong. Try again.');
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-600 text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  if (userPlan !== 'pro') {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
          <a href="/dashboard" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></a>
          <span className="font-semibold">Resume Analyzer</span>
        </div>
        <div className="flex items-center justify-center min-h-[80vh] px-6">
          <div className="max-w-sm w-full text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Analyzer is a Pro Feature</h2>
            <p className="text-gray-500 text-sm mb-8">Upgrade to Pro to unlock ATS scoring, keyword analysis, and AI-powered resume improvements.</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700"
            >
              Upgrade to Pro — ₹199/month
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full mt-3 border border-gray-200 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></a>
        <span className="font-semibold">Resume Analyzer</span>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Input Section */}
        {!result && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={22} className="text-indigo-600" />
              <h2 className="font-semibold text-lg">Paste Your Resume</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">Copy everything from your resume and paste it below</p>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your full resume text here..."
              className="w-full h-64 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-indigo-400 resize-none"
            />
            <button
              onClick={analyzeResume}
              disabled={loading || !resume.trim()}
              className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader size={18} className="animate-spin" /> Analyzing...</> : 'Analyze My Resume'}
            </button>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6">

            {/* Score Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <div className={`text-4xl font-bold mb-1 ${result.overall_score >= 70 ? 'text-green-500' : result.overall_score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {result.overall_score}
                </div>
                <div className="text-gray-400 text-sm">Overall Score</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <div className={`text-4xl font-bold mb-1 ${result.ats_score >= 70 ? 'text-green-500' : result.ats_score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {result.ats_score}
                </div>
                <div className="text-gray-400 text-sm">ATS Score</div>
              </div>
            </div>

            {/* Top 3 Fixes */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-amber-500" /> Top Fixes Needed
              </h3>
              <div className="space-y-3">
                {result.top_3_fixes?.map((fix, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="bg-amber-50 text-amber-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0">{i + 1}</span>
                    {fix}
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-indigo-500" /> Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missing_keywords?.map((kw, i) => (
                  <span key={i} className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full">{kw}</span>
                ))}
              </div>
            </div>

            {/* Improved Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold mb-3">✨ Improved Professional Summary</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{result.improved_summary}</p>
            </div>

            {/* Analyze Again */}
            <button
              onClick={() => { setResult(null); setResume(''); }}
              className="w-full border border-gray-200 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
            >
              Analyze Another Resume
            </button>
          </div>
        )}
      </div>
    </main>
  );
}