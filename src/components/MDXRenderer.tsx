interface MDXRendererProps {
  mdxSource: {
    compiledSource: string;
    scope?: Record<string, unknown>;
    frontmatter?: Record<string, unknown>;
  }
}

export function MDXRenderer({ mdxSource }: MDXRendererProps) {
  // 直接渲染HTML内容，因为我们已经将MDX转换为HTML
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-red-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-blue-500 prose-blockquote:text-gray-600">
      <div 
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: mdxSource.compiledSource }}
      />
    </div>
  )
}