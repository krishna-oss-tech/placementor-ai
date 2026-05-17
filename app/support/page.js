import Link from 'next/link';
import { Mail, HelpCircle, ChevronDown, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Support & FAQ - PlaceMentor AI',
  description: 'Get help with your PlaceMentor AI account and find answers to common questions.',
};

const faqs = [
  {
    question: "Is PlaceMentor AI free?",
    answer: "Yes, engineering students get 3 free AI mock interviews daily, along with basic quizzes and a resume score."
  },
  {
    question: "How do I upgrade to Pro?",
    answer: "You can easily upgrade to Pro by clicking the 'Upgrade Now' button on your dashboard."
  },
  {
    question: "What companies are covered?",
    answer: "Our company prep covers TCS, Infosys, Wipro, Cognizant, Accenture, and HCL."
  },
  {
    question: "How does the resume analyzer work?",
    answer: "Our AI analyzes your resume against industry standards and job descriptions, providing an ATS score and top fixes."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time directly from your dashboard."
  }
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">PlaceMentor AI</Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-gray-500">Find answers to common questions or reach out to our team.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-full flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                <Mail size={24} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h2>
              <p className="text-gray-500 text-sm mb-4 flex-grow">
                Need personalized help? Drop us an email and we'll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:support@placementorai.in" 
                className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                support@placementorai.in
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                  <HelpCircle size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-100 rounded-xl p-4 hover:border-indigo-100 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
