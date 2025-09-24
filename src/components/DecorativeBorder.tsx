interface DecorativeBorderProps {
  children: React.ReactNode;
  className?: string;
}

export default function DecorativeBorder({ children, className = "" }: DecorativeBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 黑色纹路边框 */}
      <div className="absolute inset-0 border-2 border-black/60 rounded-lg">
        {/* 左上角装饰 */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-black/80 rounded-tl-lg"></div>
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t border-l border-gray-700/60 rounded-tl-lg"></div>
        
        {/* 右上角装饰 */}
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-black/80 rounded-tr-lg"></div>
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t border-r border-gray-700/60 rounded-tr-lg"></div>
        
        {/* 左下角装饰 */}
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-black/80 rounded-bl-lg"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b border-l border-gray-700/60 rounded-bl-lg"></div>
        
        {/* 右下角装饰 */}
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-black/80 rounded-br-lg"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b border-r border-gray-700/60 rounded-br-lg"></div>
        
        {/* 中间装饰线条 */}
        <div className="absolute top-1/2 left-2 w-12 h-px bg-gradient-to-r from-black/60 to-transparent"></div>
        <div className="absolute top-1/2 right-2 w-12 h-px bg-gradient-to-l from-black/60 to-transparent"></div>
        <div className="absolute top-2 left-1/2 w-px h-12 bg-gradient-to-b from-black/60 to-transparent"></div>
        <div className="absolute bottom-2 left-1/2 w-px h-12 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* 内容区域 */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}