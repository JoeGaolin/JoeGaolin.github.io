export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readTime: number;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Next.js 14 新特性全面解析',
    slug: 'nextjs-14-features',
    excerpt: '探索 Next.js 14 的最新功能，包括 Turbopack、Server Actions 和性能优化。',
    content: `# Next.js 14 新特性全面解析

## 引言
Next.js 14 带来了许多令人兴奋的新特性，让开发体验更加流畅。

## 主要更新

### 1. Turbopack 改进
Turbopack 现在更加稳定，编译速度提升了 50%。

### 2. Server Actions
现在可以在组件中直接使用服务器操作。

### 3. 性能优化
页面加载速度显著提升。

## 结论
Next.js 14 是一个重大的版本更新，值得升级。`,
    date: '2024-01-15',
    author: 'Joe Gao',
    tags: ['Next.js', 'React', '前端'],
    readTime: 5,
    image: '/images/blog/nextjs-14.jpg'
  },
  {
    id: '2',
    title: 'TypeScript 最佳实践指南',
    slug: 'typescript-best-practices',
    excerpt: '学习 TypeScript 的高级技巧和最佳实践，提升代码质量。',
    content: `# TypeScript 最佳实践指南

## 类型安全的重要性

TypeScript 提供了强大的类型系统，帮助我们在编译时捕获错误。

## 最佳实践

### 1. 使用严格的类型检查
启用 strict 模式以获得更好的类型安全。

### 2. 合理的类型定义
避免使用 any 类型，尽量使用具体的类型定义。

### 3. 利用泛型
泛型可以让代码更加灵活和可重用。

## 总结
TypeScript 是大型项目的必备工具。`,
    date: '2024-01-10',
    author: 'Joe Gao',
    tags: ['TypeScript', '编程', '最佳实践'],
    readTime: 8,
    image: '/images/blog/typescript.jpg'
  },
  {
    id: '3',
    title: 'Tailwind CSS 设计系统构建',
    slug: 'tailwind-css-design-system',
    excerpt: '如何使用 Tailwind CSS 构建统一的设计系统和组件库。',
    content: `# Tailwind CSS 设计系统构建

## 为什么选择 Tailwind CSS

Tailwind CSS 提供了实用优先的 CSS 框架，让样式开发更加高效。

## 构建设计系统

### 1. 定义颜色系统
使用 CSS 变量定义统一的颜色 palette。

### 2. 创建组件库
基于 Tailwind 构建可复用的 UI 组件。

### 3. 响应式设计
利用 Tailwind 的响应式工具类。

## 结语
Tailwind CSS 让前端开发更加愉快。`,
    date: '2024-01-05',
    author: 'Joe Gao',
    tags: ['Tailwind CSS', '设计', 'CSS'],
    readTime: 6,
    image: '/images/blog/tailwind.jpg'
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};