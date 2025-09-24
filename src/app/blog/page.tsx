import Link from 'next/link';
import { getAllPosts } from '@/data/blog/posts';
import { generateBlogUrl, formatBlogDate } from '@/lib/blog-utils';

export default async function BlogPage() {
  const posts = await getAllPosts();

  // 按年份分组文章
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(242, 249, 213)' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">技术博客</h1>
          <p className="text-gray-600">分享技术见解和开发经验</p>
        </div>

        {/* 最新文章 */}
        {posts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              最新文章
            </h2>
            <div className="space-y-3">
              {posts.slice(0, 10).map((post) => (
                <div key={post.id} className="flex items-center text-sm">
                  <time className="text-gray-500 w-40 flex-shrink-0">
                    {formatBlogDate(post.date, true)}
                  </time>
                  <span className="text-gray-400 mx-2">»</span>
                  <Link 
                    href={generateBlogUrl(post)}
                    className="text-blue-600 hover:text-blue-800 hover:underline flex-1"
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
            {posts.length > 10 && (
              <div className="mt-4">
                <Link 
                  href="#all-posts"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  更多文章……
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 按年份分组的文章 */}
        <div id="all-posts">
          {years.map((year) => (
            <div key={year} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                {year}年
              </h2>
              <div className="space-y-3">
                {postsByYear[Number(year)].map((post) => (
                  <div key={post.id} className="flex items-center text-sm">
                    <time className="text-gray-500 w-32 flex-shrink-0">
                      {formatBlogDate(post.date, false)}
                    </time>
                    <span className="text-gray-400 mx-2">»</span>
                    <Link 
                      href={generateBlogUrl(post)}
                      className="text-blue-600 hover:text-blue-800 hover:underline flex-1"
                    >
                      {post.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">暂无文章</h3>
            <p className="text-gray-600">稍后回来查看最新内容。</p>
          </div>
        )}
      </div>
    </div>
  );
}