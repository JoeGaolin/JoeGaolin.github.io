import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 自定义标题样式
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 border-b-2 border-blue-200 pb-2" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-medium text-gray-700 mb-3 mt-5" {...props}>
        {children}
      </h3>
    ),
    
    // 自定义段落样式
    p: ({ children, ...props }) => (
      <p className="text-gray-700 leading-relaxed mb-4" {...props}>
        {children}
      </p>
    ),
    
    // 自定义代码块样式
    code: ({ children, ...props }) => (
      <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    ),
    
    // 自定义代码块样式
    pre: ({ children, ...props }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props}>
        {children}
      </pre>
    ),
    
    // 自定义链接样式
    a: ({ href, children, ...props }) => (
      <Link 
        href={href || '#'} 
        className="text-blue-600 hover:text-blue-800 underline transition-colors" 
        {...props}
      >
        {children}
      </Link>
    ),
    
    // 自定义列表样式
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-gray-700" {...props}>
        {children}
      </li>
    ),
    
    // 自定义引用样式
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4" {...props}>
        {children}
      </blockquote>
    ),
    
    // 自定义图片样式
    img: ({ src, alt, ...props }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg shadow-md mb-4"
        {...props}
      />
    ),
    
    // 自定义表格样式
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-gray-300" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-gray-300 px-4 py-2" {...props}>
        {children}
      </td>
    ),
    
    // 自定义分割线样式
    hr: ({ ...props }) => (
      <hr className="border-t-2 border-gray-200 my-8" {...props} />
    ),
    
    ...components,
  }
}