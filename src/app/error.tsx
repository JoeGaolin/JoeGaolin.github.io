'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-bold text-white mb-4">出错了</h1>
        <p className="text-white/80 mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  );
}