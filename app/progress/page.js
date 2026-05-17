'use client';
import Link from 'next/link';

const stats = [
  { label: 'Total Interviews', value: '24' },
  { label: 'Average Score', value: '82%' },
  { label: 'Current Streak', value: '5 days' },
  { label: 'Best Score', value: '95%' },
];

const weeklyActivity = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 1 },
  { day: 'Wed', count: 3 },
  { day: 'Thu', count: 2 },
  { day: 'Fri', count: 4 },
  { day: 'Sat', count: 1 },
  { day: 'Sun', count: 1 },
];

const recentActivity = [
  { date: 'May 16', type: 'Technical', score: '88%' },
  { date: 'May 15', type: 'HR', score: '79%' },
  { date: 'May 14', type: 'Aptitude', score: '84%' },
  { date: 'May 13', type: 'Communication', score: '91%' },
  { date: 'May 12', type: 'Technical', score: '85%' },
];

const skills = [
  { name: 'HR', level: 78 },
  { name: 'Technical', level: 84 },
  { name: 'Aptitude', level: 72 },
  { name: 'Communication', level: 88 },
];

const motivationalMessage = 'You are making strong progress! Keep practicing consistently and aim for one more interview session this week to stay on track.';

export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-3xl px-5 py-5 shadow-sm">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
            <span className="text-lg">←</span>
            Back to dashboard
          </Link>
          <div>
            <p className="text-sm text-gray-500">Progress overview</p>
            <h1 className="text-2xl font-semibold text-gray-900">Your placement journey</h1>
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
              {recentActivity.map((item) => (
                <div key={item.date + item.type} className="flex items-center justify-between rounded-3xl border border-gray-100 bg-gray-50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <div className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">{item.score}</div>
                </div>
              ))}
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
