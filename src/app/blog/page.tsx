import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/data/blog/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">技术博客</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          分享前端开发、TypeScript、Next.js 和其他技术相关的内容和见解。
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {post.image && (
              <div className="h-48 bg-gray-200 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('zh-CN')}
                </time>
                <span>{post.readTime} 分钟阅读</span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  阅读更多 →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无文章</h3>
          <p className="text-gray-600">稍后回来查看最新内容。</p>
        </div>
      )}
    </div>
  );
}