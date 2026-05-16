'use client';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const topics = [
  { key: 'Quantitative', label: 'Quantitative' },
  { key: 'Verbal', label: 'Verbal' },
  { key: 'Logical', label: 'Logical Reasoning' },
  { key: 'Coding', label: 'Coding' },
];

const difficulties = ['Easy', 'Medium', 'Hard'];

export default function AptitudePage() {
  const [stage, setStage] = useState('topic');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const selectTopic = (key) => {
    setTopic(key);
    setStage('difficulty');
  };

  const selectDifficulty = async (level) => {
    setDifficulty(level);
    setLoading(true);
    try {
      const res = await fetch('/api/aptitude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty: level }),
      });
      const data = await res.json();
      setQuestions(data.questions || []);
      setStage('quiz');
      setCurrentIndex(0);
      setSelected('');
      setFeedback(null);
      setScore(0);
    } catch (error) {
      setQuestions([]);
      setFeedback({ type: 'error', message: 'Unable to load questions. Please try again.' });
    }
    setLoading(false);
  };

  const currentQuestion = questions[currentIndex];
  const answered = selected !== '';

  const handleAnswer = (option) => {
    if (answered) return;
    setSelected(option);
    if (!currentQuestion) return;

    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) setScore((prev) => prev + 1);

    setFeedback({
      type: isCorrect ? 'success' : 'error',
      correct: currentQuestion.answer,
      explanation: currentQuestion.explanation || 'No explanation available.',
      isCorrect,
    });
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setStage('result');
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelected('');
    setFeedback(null);
  };

  const performanceMessage = () => {
    const percentage = questions.length ? Math.round((score / questions.length) * 100) : 0;
    if (percentage >= 80) return 'Excellent work! You are well prepared.';
    if (percentage >= 60) return 'Good job! A little more practice will help you improve.';
    return 'Keep practicing to improve your aptitude skills.';
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <a href="/dashboard" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></a>
        <span className="font-semibold">Aptitude Quiz</span>
      </div>

      <div className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        {stage === 'topic' && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Choose a topic</h2>
            <p className="text-gray-500 mb-6">Start with one of these aptitude topics and test your knowledge.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {topics.map((item) => (
                <button key={item.key} onClick={() => selectTopic(item.key)} className="text-left bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
                  <div className="text-indigo-600 font-bold text-xl mb-2">{item.initial || item.key.charAt(0)}</div>
                  <h3 className="text-lg font-semibold mb-1">{item.label}</h3>
                  <p className="text-gray-500 text-sm">{item.label} questions to sharpen your aptitude skills.</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === 'difficulty' && (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Select difficulty</h2>
            <p className="text-gray-500 mb-6">Topic: <span className="font-semibold text-indigo-600">{topic}</span></p>
            <div className="flex flex-col sm:flex-row gap-4">
              {difficulties.map((level) => (
                <button key={level} onClick={() => selectDifficulty(level)} className="flex-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-2xl px-6 py-4 font-semibold hover:bg-indigo-100 transition-all">
                  {level}
                </button>
              ))}
            </div>
            {loading && <p className="mt-6 text-gray-500">Loading questions...</p>}
          </div>
        )}

        {stage === 'quiz' && currentQuestion && (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Topic: {topic}</div>
              <div className="text-sm text-gray-500 mb-1">Difficulty: {difficulty}</div>
              <h2 className="text-xl font-bold">Question {currentIndex + 1} of {questions.length}</h2>
            </div>
            <div className="mb-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
              <p className="text-gray-900 text-lg font-medium">{currentQuestion.question}</p>
            </div>
            <div className="grid gap-4">
              {['A', 'B', 'C', 'D'].map((optionKey) => {
                const optionText = currentQuestion.options?.[optionKey];
                const isSelected = selected === optionKey;
                const isCorrect = selected && optionKey === currentQuestion.answer;
                const wrongSelected = selected === optionKey && optionKey !== currentQuestion.answer;
                const baseClass = 'rounded-3xl p-4 text-left border transition-all';
                const stateClass = isCorrect
                  ? 'bg-green-50 border-green-200 text-green-900'
                  : wrongSelected
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50';
                return (
                  <button key={optionKey} onClick={() => handleAnswer(optionKey)} disabled={answered} className={`${baseClass} ${stateClass}`}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center">{optionKey}</span>
                      <span className="text-sm text-gray-900">{optionText}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div className="mt-6 p-5 rounded-3xl bg-gray-50 border border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-2">Explanation</div>
                <p className="text-gray-700">{feedback.explanation}</p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button onClick={nextQuestion} disabled={!answered} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-700 disabled:opacity-50">
                {currentIndex + 1 === questions.length ? 'View Results' : 'Next Question'}
              </button>
            </div>
          </div>
        )}

        {stage === 'result' && (
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-3">Quiz complete</h2>
            <p className="text-gray-500 mb-6">You completed the {topic} quiz at {difficulty} difficulty.</p>
            <div className="inline-flex flex-col gap-3 bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
              <div className="text-3xl font-bold text-indigo-700">{score}/{questions.length}</div>
              <div className="text-xl font-semibold text-gray-900">{questions.length ? Math.round((score / questions.length) * 100) : 0}%</div>
              <p className="text-gray-600 max-w-xl mx-auto">{performanceMessage()}</p>
            </div>
            <div className="mt-8">
              <button onClick={() => setStage('topic')} className="bg-white border border-indigo-200 text-indigo-700 px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-50">
                Try another topic
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
