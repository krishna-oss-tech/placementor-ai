'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-600 text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    { label: 'Total Interviews', value: userData?.totalInterviews || 0 },
    { label: 'Average Score', value: userData?.avgScore ? `${userData.avgScore}%` : '-- %' },
    { label: 'Current Streak', value: userData?.streak ? `${userData.streak} days` : '0 days' },
    { label: 'Best Score', value: userData?.bestScore ? `${userData.bestScore}%` : '-- %' },
  ];

  const weeklyActivity = userData?.weeklyActivity || [
    { day: 'Mon', count: 0 },
    { day: 'Tue', count: 0 },
    { day: 'Wed', count: 0 },
    { day: 'Thu', count: 0 },
    { day: 'Fri', count: 0 },
    { day: 'Sat', count: 0 },
    { day: 'Sun', count: 0 },
  ];

  const recentActivity = userData?.recentActivity || [];

  const skills = userData?.skills || [
    { name: 'HR', level: 0 },
    { name: 'Technical', level: 0 },
    { name: 'Aptitude', level: 0 },
    { name: 'Communication', level: 0 },
  ];

  const motivationalMessage = userData?.totalInterviews > 0
    ? 'You are making strong progress! Keep practicing consistently and aim for one more interview session this week to stay on track.'
    : 'Start your first interview to begin tracking your progress. Consistency is the key to cracking placements!';

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-3xl px-5 py-5 shadow-sm">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
            <span className="text-lg">←</span>
            Back to dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 text-indigo-600 text-sm px-4 py-1 rounded-full">
              {userData?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
            </div>
            <div>
              <p className="text-sm text-gray-500">Progress overview</p>
              <h1 className="text-2xl font-semibold text-gray-900">Your placement journey</h1>
            </div>
          </div>
        </div>

        <section className="grid gap-4 xl:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Weekly activity</p>
                <h2 className="text-xl font-semibold text-gray-900">Interviews this week</h2>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Active</span>
            </div>
            <div className="mt-6 flex items-end gap-3 h-44">
              {weeklyActivity.map((item) => {
                const height = item.count * 10 + 20;
                return (
                  <div key={item.day} className="flex flex-col items-center gap-2">
                    <div className="relative flex h-40 w-10 items-end rounded-3xl bg-gray-100 overflow-hidden">
                      <div className="w-full rounded-3xl bg-indigo-600 transition-all" style={{ height: `${height}%` }} />
                    </div>
                    <span className="text-xs text-gray-500">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recent activity</p>
                <h2 className="text-xl font-semibold text-gray-900">Last 5 interviews</h2>
              </div>
              <span className="text-sm text-gray-500">Updated today</span>
            </div>
            <div className="mt-6 space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-3xl border border-gray-100 bg-gray-50 p-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                    <div className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">{item.score}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-lg">No interviews yet</p>
                  <p className="text-sm mt-1">Complete your first interview to see activity here</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">Skill breakdown</p>
              <h2 className="text-xl font-semibold text-gray-900">Skill progress</h2>
            </div>
            <div className="mt-6 space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between text-sm font-medium text-gray-900">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
                    <div className="h-3 rounded-full bg-indigo-600" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white p-4 text-indigo-600 shadow-sm">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-700">Motivation</p>
              <h2 className="mt-2 text-xl font-semibold text-gray-900">Keep pushing forward</h2>
              <p className="mt-3 text-gray-700">{motivationalMessage}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
