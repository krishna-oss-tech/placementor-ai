import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center">
        <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
          PlaceMentor AI
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-9xl font-extrabold text-indigo-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
          <p className="text-gray-500 text-sm mb-10">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
