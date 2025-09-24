import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getBlogPostBySlug } from '@/data/blog/posts';
import { MDXRenderer } from '@/components/MDXRenderer';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // 解码URL编码的slug
  const decodedSlug = decodeURIComponent(slug);
  
  const post = await getBlogPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(242, 249, 213)' }}>
      <article className="max-w-4xl mx-auto px-4 py-8">
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
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={256}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </header>

        {/* Content */}
        {post.isMDX && post.mdxSource ? (
          <MDXRenderer mdxSource={post.mdxSource} />
        ) : (
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        )}

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
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    
    const params = posts.map((post) => ({
      slug: encodeURIComponent(post.slug), // 对中文slug进行URL编码
    }));
    
    console.log('Generated static params:', params);
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// 生成页面元数据
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  const post = await getBlogPostBySlug(slug);
  
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