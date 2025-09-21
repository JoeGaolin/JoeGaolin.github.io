import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to My Personal Website</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 text-lg mb-4">
            This is a Next.js website deployed to GitHub Pages.
          </p>
          <Link 
            href="/about" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to About Page
          </Link>
        </div>
      </div>
    </div>
  )
}