import { BlogPost } from '@/data/blog/posts';

export function generateBlogUrl(post: BlogPost): string {
  // 对中文slug进行URL编码
  return `/blog/${encodeURIComponent(post.slug)}`;
}

export function formatBlogDate(date: string, includeYear: boolean = true): string {
  const dateObj = new Date(date);
  
  if (includeYear) {
    // 阮一峰风格：2025年09月12日
    return dateObj.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '年').replace(/年(\d{2})月/, '年$1月').replace(/月(\d{2})日/, '月$1日');
  } else {
    // 简化格式：09月12日
    return dateObj.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '月') + '日';
  }
}