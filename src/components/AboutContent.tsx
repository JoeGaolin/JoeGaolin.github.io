export default function AboutContent() {
  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
          关于我
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
      </div>

      {/* 自我介绍内容 */}
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>emmmm在想内容。。。。。。</p>
      </div>

      {/* 技能标签 */}
      <div className="mt-8">
        <h3 className="text-white font-medium mb-4 text-center">技术栈</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Git'].map((skill) => (
            <span 
              key={skill}
              className="px-3 py-1 bg-black/30 border border-gray-600/50 rounded-full text-sm text-gray-300 hover:bg-black/50 transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 联系方式 */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          在雨中思考，在代码中成长
        </p>
      </div>
    </div>
  );
}