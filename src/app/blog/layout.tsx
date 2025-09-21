import Link from 'next/link';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/blog" 
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              技术博客
            </Link>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                首页
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                关于
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Joe Gao的技术博客. 保留所有权利.</p>
            <p className="mt-2">用 ❤️ 编写的代码</p>
          </div>
        </div>
      </footer>
    </div>
  );
}