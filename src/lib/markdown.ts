import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// 配置marked选项
marked.setOptions({
  breaks: true, // 支持换行
  gfm: true, // 支持GitHub风格的Markdown
});

export interface MarkdownPost {
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

const postsDirectory = path.join(process.cwd(), 'public/tech_blogs');

async function processMarkdownFile(fileName: string): Promise<MarkdownPost | null> {
  try {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const isMDX = fullPath.endsWith('.mdx');

    const processedContent: string = await marked(content);
    let mdxSource: {
      compiledSource: string;
      scope?: Record<string, unknown>;
      frontmatter?: Record<string, unknown>;
    } | undefined = undefined;
    
    // 对于MDX文件，仍然标记为MDX但使用HTML内容
    if (isMDX) {
      mdxSource = {
        compiledSource: processedContent,
        scope: {},
        frontmatter: data,
      };
    }

    // 计算阅读时间（基于中文字符数）
    const chineseCharCount = content.replace(/[^\u4e00-\u9fa5]/g, '').length;
    const readTime = Math.ceil(chineseCharCount / 300); // 假设每分钟300字

    // 生成摘要（取前150个字符）
    const excerpt = content.replace(/[#*`]/g, '').substring(0, 150) + '...';

    // 优先使用文件名中的标题，如果没有则使用frontmatter中的title
    const title = data.title || generateSlugFromFilename(fileName);
    const slug = generateSlugFromTitle(title);
    
    // 优先使用文件名中的日期，如果没有则使用frontmatter中的date
    const filenameDate = extractDateFromFilename(fileName);
    const date = filenameDate || data.date || new Date().toISOString().split('T')[0];

    return {
      id: slug,
      title: title,
      slug: slug,
      excerpt: data.description || excerpt,
      content: processedContent,
      mdxSource: mdxSource,
      date: date,
      author: data.author || '张德旭',
      tags: data.tags || [],
      readTime: readTime,
      image: data.cover,
      description: data.description,
      cover: data.cover,
      isMDX: isMDX,
    };
  } catch (error) {
    console.error(`Error processing file ${fileName}:`, error);
    return null;
  }
}

export async function getAllMarkdownPosts(): Promise<MarkdownPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(
      fileNames
        .filter(name => name.endsWith('.md') || name.endsWith('.mdx'))
        .map(async (fileName) => {
          // 直接处理文件，而不是通过slug查找
          return await processMarkdownFile(fileName);
        })
    );
    
    return allPostsData.filter(post => post !== null) as MarkdownPost[];
  } catch (error) {
    console.error('Error reading markdown posts:', error);
    return [];
  }
}

export async function getMarkdownPostBySlug(slug: string): Promise<MarkdownPost | null> {
  try {
    // 根据slug查找对应的文件
    const fileNames = fs.readdirSync(postsDirectory);
    const fileName = fileNames.find(name => {
      if (!name.endsWith('.md') && !name.endsWith('.mdx')) return false;
      
      const fullPath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      // 优先使用文件名中的标题，如果没有则使用frontmatter中的title
      const title = data.title || generateSlugFromFilename(name);
      const fileSlug = generateSlugFromTitle(title);
      
      return fileSlug === slug;
    });
    
    if (!fileName) {
      return null;
    }
    
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const isMDX = fullPath.endsWith('.mdx');

    const processedContent: string = await marked(content);
    let mdxSource: {
      compiledSource: string;
      scope?: Record<string, unknown>;
      frontmatter?: Record<string, unknown>;
    } | undefined = undefined;
    
    // 对于MDX文件，仍然标记为MDX但使用HTML内容
    if (isMDX) {
      mdxSource = {
        compiledSource: processedContent,
        scope: {},
        frontmatter: data,
      };
    }

    // 计算阅读时间（基于中文字符数）
    const chineseCharCount = content.replace(/[^\u4e00-\u9fa5]/g, '').length;
    const readTime = Math.ceil(chineseCharCount / 300); // 假设每分钟300字

    // 生成摘要（取前150个字符）
    const excerpt = content.replace(/[#*`]/g, '').substring(0, 150) + '...';

    // 优先使用文件名中的标题，如果没有则使用frontmatter中的title
    const title = data.title || generateSlugFromFilename(fileName);
    const generatedSlug = generateSlugFromTitle(title);
    
    // 优先使用文件名中的日期，如果没有则使用frontmatter中的date
    const filenameDate = extractDateFromFilename(fileName);
    const date = filenameDate || data.date || new Date().toISOString().split('T')[0];

    return {
      id: generatedSlug,
      title: title,
      slug: generatedSlug,
      excerpt: data.description || excerpt,
      content: processedContent,
      mdxSource: mdxSource,
      date: date,
      author: data.author || '张德旭',
      tags: data.tags || [],
      readTime: readTime,
      image: data.cover,
      description: data.description,
      cover: data.cover,
      isMDX: isMDX,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function generateSlugFromFilename(filename: string): string {
  // 从文件名中提取标题部分，去掉日期前缀和扩展名
  // 例如: "2025.9.24_关于搭建博客涉及到的关键技术讲解.mdx" -> "关于搭建博客涉及到的关键技术讲解"
  const withoutExt = filename.replace(/\.(md|mdx)$/, '');
  const match = withoutExt.match(/^\d{4}\.\d{1,2}\.\d{1,2}_(.+)$/);
  return match ? match[1] : withoutExt;
}

export function extractDateFromFilename(filename: string): string | null {
  // 从文件名中提取日期
  // 例如: "2025.9.24_关于搭建博客涉及到的关键技术讲解.mdx" -> "2025-09-24"
  const match = filename.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2})_/);
  if (match) {
    const [, year, month, day] = match;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return null;
}

export function generateSlugFromTitle(title: string): string {
  // 从标题生成URL友好的slug
  // 对于中文标题，直接使用标题作为slug（因为中文URL编码后仍然可读）
  // 例如: "关于搭建博客涉及到的关键技术讲解" -> "关于搭建博客涉及到的关键技术讲解"
  return title
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, '') // 只保留中文、英文、数字和空格
    .replace(/\s+/g, '-') // 空格替换为连字符
    .trim();
}

export async function getPostBySlug(slug: string): Promise<MarkdownPost | null> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    
    // 查找匹配的文件
    const fileName = fileNames.find(name => {
      if (!name.endsWith('.md') && !name.endsWith('.mdx')) return false;
      
      const fullPath = path.join(postsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      // 优先使用文件名中的标题，如果没有则使用frontmatter中的title
      const title = data.title || generateSlugFromFilename(name);
      const fileSlug = generateSlugFromTitle(title);
      
      return fileSlug === slug;
    });
    
    if (!fileName) {
      return null;
    }
    
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const isMDX = fullPath.endsWith('.mdx');

    const processedContent: string = await marked(content);
    let mdxSource: {
      compiledSource: string;
      scope?: Record<string, unknown>;
      frontmatter?: Record<string, unknown>;
    } | undefined = undefined;
    
    // 对于MDX文件，仍然标记为MDX但使用HTML内容
    if (isMDX) {
      mdxSource = {
        compiledSource: processedContent,
        scope: {},
        frontmatter: data,
      };
    }

    // 计算阅读时间（基于中文字符数）
    const chineseCharCount = content.replace(/[^\u4e00-\u9fa5]/g, '').length;
    const readTime = Math.ceil(chineseCharCount / 300); // 假设每分钟300字

    // 生成摘要（取前150个字符）
    const excerpt = content.replace(/[#*`]/g, '').substring(0, 150) + '...';

    // 优先使用文件名中的标题，如果没有则使用frontmatter中的title
    const title = data.title || generateSlugFromFilename(fileName);
    const generatedSlug = generateSlugFromTitle(title);
    
    // 优先使用文件名中的日期，如果没有则使用frontmatter中的date
    const filenameDate = extractDateFromFilename(fileName);
    const date = filenameDate || data.date || new Date().toISOString().split('T')[0];

    return {
      id: generatedSlug,
      title: title,
      slug: generatedSlug,
      excerpt: data.description || excerpt,
      content: processedContent,
      mdxSource: mdxSource,
      date: date,
      author: data.author || '张德旭',
      tags: data.tags || [],
      readTime: readTime,
      image: data.cover,
      description: data.description,
      cover: data.cover,
      isMDX: isMDX,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}