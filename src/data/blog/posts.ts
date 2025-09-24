import { getAllMarkdownPosts, getPostBySlug } from '@/lib/markdown';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  mdxSource?: {
    compiledSource: string;
    scope?: Record<string, unknown>;
    frontmatter?: Record<string, unknown>;
  }; // MDX序列化后的内容
  date: string;
  author: string;
  tags: string[];
  readTime: number;
  image?: string;
  description?: string;
  cover?: string;
  isMDX?: boolean; // 标识是否为MDX文件
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  // 从Markdown文件获取
  const markdownPost = await getPostBySlug(slug);
  if (markdownPost) {
    return markdownPost;
  }
  
  return undefined;
};

export const getAllPosts = async (): Promise<BlogPost[]> => {
  // 获取所有Markdown文章
  const markdownPosts = await getAllMarkdownPosts();
  
  // 按日期排序
  return markdownPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};