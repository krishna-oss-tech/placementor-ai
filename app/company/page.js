'use client';
import { useState } from 'react';
import { ArrowLeft, Send, Loader } from 'lucide-react';

const companies = [
  { key: 'TCS', name: 'TCS', initial: 'T', difficulty: 'Moderate', avgPackage: '4.5 LPA' },
  { key: 'Infosys', name: 'Infosys', initial: 'I', difficulty: 'Moderate', avgPackage: '5 LPA' },
  { key: 'Wipro', name: 'Wipro', initial: 'W', difficulty: 'Moderate', avgPackage: '4 LPA' },
  { key: 'Cognizant', name: 'Cognizant', initial: 'C', difficulty: 'Moderate', avgPackage: '5 LPA' },
  { key: 'Accenture', name: 'Accenture', initial: 'A', difficulty: 'High', avgPackage: '10 LPA' },
  { key: 'HCL', name: 'HCL', initial: 'H', difficulty: 'Moderate', avgPackage: '4 LPA' },
];

export default function CompanyPage() {
  const [company, setCompany] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const startCompanyChat = (comp) => {
    setCompany(comp);
    setStarted(true);
    setMessages([
      { role: 'ai', text: `Hello! I'm your AI interviewer for ${comp.name}. I'll ask you company-specific interview questions for ${comp.name}. Ready? Here's your first question:\n\nTell me about the projects you've worked on that are relevant to ${comp.name}.` }
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, company: company?.key })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || "I couldn't generate a response right now." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Something went wrong. Please try again.' }]);
    }

    setLoading(false);
  };

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const formatText = (text) => {
    const escaped = escapeHtml(text);
    const withStrong = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return withStrong.replace(/\n/g, '<br/>');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></a>
        <span className="font-semibold">Company Prep</span>
        {company && <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">{company.name}</span>}
      </div>

      {/* Company Cards */}
      {!started && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-xl font-bold mb-2">Company-specific Practice</h2>
          <p className="text-gray-500 text-sm mb-6">Choose a company to practice placement questions tailored to them.</p>

          <div className="grid md:grid-cols-3 gap-4">
            {companies.map((c) => (
              <button key={c.key} onClick={() => startCompanyChat(c)} className="bg-white rounded-2xl border border-gray-100 p-4 text-left hover:border-indigo-200 hover:shadow-sm transition-all flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">{c.initial}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{c.name}</h3>
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">{c.difficulty}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Avg. Package: <span className="text-indigo-600 font-medium">{c.avgPackage}</span></p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat UI */}
      {started && (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6 max-w-3xl mx-auto w-full space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap bg-indigo-600 text-white rounded-br-sm`}>
                    {msg.text}
                  </div>
                ) : (
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap bg-white border border-gray-100 text-gray-800 rounded-bl-sm`} dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <Loader size={16} className="animate-spin text-indigo-500" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-100 px-6 py-4">
            <div className="max-w-3xl mx-auto flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your answer here..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400"
              />
              <button onClick={sendMessage} disabled={loading}
                className="bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50">
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}

    </main>
  );
}
