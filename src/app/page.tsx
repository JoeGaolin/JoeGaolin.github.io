import Image from 'next/image'

export default function Home() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/images/rain.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="text-center">
        {/* 圆形头像 */}
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto">
            <Image
              src="/images/hero.jpg"
              alt="个人头像"
              width={128}
              height={128}
              className="w-full h-full rounded-full object-cover border-4 border-white/20 shadow-2xl"
            />
            {/* 头像周围的装饰环 */}
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
          </div>
        </div>
        
        {/* 个人简介 */}
        <div className="space-y-4">
          <h1 className="text-3xl font-light text-white drop-shadow-lg">
            欢迎来到我的个人空间
          </h1>
          <p className="text-white/80 text-lg font-light max-w-md mx-auto leading-relaxed">
            在这里分享我的思考、学习和成长
          </p>
        </div>
      </div>
    </div>
  )
}