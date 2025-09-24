import Image from 'next/image'
import { Inter, Noto_Sans_SC } from 'next/font/google'

// 选择字体
const inter = Inter({ subsets: ['latin'] })
const notoSans = Noto_Sans_SC({ 
  subsets: ['latin'],
  weight: ['300', '400'] 
})

export default function Home() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-900 via-black to-green-950"
      style={{
        backgroundImage: "url('/images/rain.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="text-center">
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            <Image
              src="/images/hero.jpg"
              alt="个人头像"
              width={128}
              height={128}
              className="w-full h-full rounded-full object-cover border-4 border-green-400/30 shadow-2xl shadow-green-500/20"
            />
            <div className="absolute inset-0 rounded-full border-2 border-green-300/40 animate-pulse"></div>
          </div>
        </div>
        
        {/* 个人简介 */}
        <div className={`${notoSans.className} space-y-6`}>
          <p className="text-gray-300/100 text-xl font-bold max-w-7xl mx-auto leading-loose tracking-wide">
            我是个不太会说话的<a href="/about" className="text-green-300 hover:text-green-200 underline decoration-green-400/50 hover:decoration-green-300 transition-colors duration-200">研究生</a>，可能更适合跟代码打交道。电脑不会judge我，报错信息也比人际关系好懂得多。
            <br />
            平时有写点技术笔记的习惯，就像在给自己建一个<a href="/blog" className="text-green-300 hover:text-green-200 underline decoration-green-400/50 hover:decoration-green-300 transition-colors duration-200">私人图书馆</a>。如果你碰巧路过，对某些书脊上的标题感兴趣，可以随便翻翻——里面大概都是些偏执的实现细节和笨拙的优化尝试。
            <br />
            博客里也零散记着些<a href="/life" className="text-green-300 hover:text-green-200 underline decoration-green-400/50 hover:decoration-green-300 transition-colors duration-200">日常</a>，像.commit message一样琐碎。目前还是个半成品，有些页面可能加载得有点慢，或者样式怪怪的。如果你遇到什么bug，方便的话可以在我<a href="https://github.com/JoeGaolin/JoeGaolin.github.io" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline decoration-green-400/50 hover:decoration-green-300 transition-colors duration-200">GitHub</a>留个<a href="https://github.com/JoeGaolin/JoeGaolin.github.io/issues" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline decoration-green-400/50 hover:decoration-green-300 transition-colors duration-200">issue</a>——就像给路边野猫留个小鱼干，我会偷偷高兴很久。
          </p>
        </div>
      </div>
    </div>
  )
}