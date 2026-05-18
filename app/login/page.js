'use client';
import { useState } from 'react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="text-3xl font-bold text-indigo-600 mb-2">PlaceMentor AI</div>
        <p className="text-gray-400 text-sm mb-8">India's #1 AI Placement Prep Platform</p>
        <h2 className="text-xl font-semibold mb-2">Welcome! 👋</h2>
        <p className="text-gray-500 text-sm mb-8">Sign in to start your placement preparation</p>
        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-6 hover:bg-gray-50 transition-all disabled:opacity-50"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span className="font-medium">{loading ? 'Signing in...' : 'Continue with Google'}</span>
        </button>
        <p className="text-gray-400 text-xs mt-6">By signing in, you agree to our Terms of Service</p>
      </div>
    </main>
  );
}
