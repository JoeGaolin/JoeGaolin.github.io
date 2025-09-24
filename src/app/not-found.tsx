import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-white mb-4">页面未找到</h1>
        <p className="text-white/80 mb-8">抱歉，您访问的页面不存在。</p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}