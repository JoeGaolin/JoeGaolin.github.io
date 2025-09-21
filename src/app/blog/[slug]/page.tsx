import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/data/blog/posts';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        ← 返回博客列表
      </Link>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center space-x-4">
            <span>作者: {post.author}</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </time>
            <span>{post.readTime} 分钟阅读</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {post.image && (
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-gray-700 leading-relaxed">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← 查看所有文章
        </Link>
      </div>
    </article>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成页面元数据
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} | 技术博客`,
    description: post.excerpt,
  };
}