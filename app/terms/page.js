import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - PlaceMentor AI',
  description: 'Terms of Service for PlaceMentor AI placement preparation platform.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">PlaceMentor AI</Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to Home</Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: May 2026</p>

        <div className="space-y-8">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              By accessing or using PlaceMentor AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to update these terms at any time, and your continued use of the Service constitutes acceptance of any changes.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Use of Service</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              PlaceMentor AI provides AI-powered placement preparation tools including mock interviews, resume analysis, and company-specific preparation. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
              <li>Use the Service only for lawful purposes and personal placement preparation</li>
              <li>Not attempt to reverse-engineer, copy, or redistribute any part of the Service</li>
              <li>Not share your account credentials with others</li>
              <li>Provide accurate information during registration</li>
              <li>Not use automated scripts or bots to access the Service</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Payment Terms</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              PlaceMentor AI offers both free and paid (Pro) plans. For paid subscriptions:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
              <li>Pro Plan is billed at ₹199/month</li>
              <li>Payments are processed securely through Razorpay</li>
              <li>Your subscription begins immediately upon successful payment</li>
              <li>We do not store your payment card details — all payment processing is handled by Razorpay</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Refund Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We offer a 7-day refund window from the date of purchase. If you are unsatisfied with the Pro Plan, you may request a full refund within 7 days of your payment by contacting us at support@placementor.ai. After 7 days, no refunds will be issued. Refunds are processed to the original payment method within 5–7 business days.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              All content, features, and functionality of PlaceMentor AI — including but not limited to text, graphics, logos, icons, software, and AI-generated responses — are the exclusive property of PlaceMentor AI and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of the Service without prior written consent.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              PlaceMentor AI is provided "as is" without warranties of any kind. We do not guarantee placement success or specific outcomes from using the Service. AI-generated interview feedback and resume analysis are for educational purposes only and should not be considered professional career advice. In no event shall PlaceMentor AI be liable for any indirect, incidental, or consequential damages arising from use of the Service.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Contact Information</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
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
