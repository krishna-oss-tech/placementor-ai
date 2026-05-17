import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - PlaceMentor AI',
  description: 'Privacy Policy for PlaceMentor AI placement preparation platform.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">PlaceMentor AI</Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Home</Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: May 2026</p>

        <div className="space-y-8">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We collect the following types of information when you use PlaceMentor AI:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, and profile picture (provided via Google Sign-In)</li>
              <li><strong>Usage Data:</strong> Interview responses, resume text submitted for analysis, feature usage patterns, and session duration</li>
              <li><strong>Account Data:</strong> Subscription plan, payment transaction IDs, daily usage counts, and streak information</li>
              <li><strong>Device Data:</strong> Browser type, device type, and general location (country level) for analytics purposes</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
              <li>Provide and improve our AI-powered placement preparation services</li>
              <li>Track your progress, streaks, and interview performance</li>
              <li>Process payments and manage your subscription</li>
              <li>Send important service-related notifications</li>
              <li>Analyze usage patterns to improve the platform experience</li>
              <li>Enforce daily usage limits for free-tier users</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Data Storage</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your data is securely stored using <strong>Google Firebase</strong> (Firestore and Firebase Authentication). Firebase provides enterprise-grade security including encryption at rest and in transit. Your data is stored in Google Cloud data centers. We retain your data for as long as your account is active. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              We use the following third-party services to operate PlaceMentor AI:
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <p className="font-medium text-gray-900 text-sm">Google Firebase</p>
                <p className="text-gray-500 text-xs mt-1">Authentication (Google Sign-In) and database storage (Firestore)</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <p className="font-medium text-gray-900 text-sm">Razorpay</p>
                <p className="text-gray-500 text-xs mt-1">Secure payment processing for Pro Plan subscriptions</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <p className="font-medium text-gray-900 text-sm">Groq</p>
                <p className="text-gray-500 text-xs mt-1">AI inference engine for generating interview questions, feedback, and resume analysis</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Each third-party service has its own privacy policy. We encourage you to review them independently.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Your Rights</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of any inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your account and all associated data</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Objection:</strong> Object to processing of your data for specific purposes</li>
            </ul>
            <p className="text-gray-500 text-sm mt-3">
              To exercise any of these rights, please contact us at the email address below.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Contact Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at:
            </p>
            <p className="mt-3">
              <a href="mailto:support@placementor.ai" className="text-indigo-600 font-medium hover:underline">support@placementor.ai</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
