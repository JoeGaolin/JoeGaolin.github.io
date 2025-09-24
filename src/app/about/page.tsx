import RainEffect from '@/components/RainEffect';
import BackButton from '@/components/BackButton';
import DecorativeBorder from '@/components/DecorativeBorder';
import AboutContent from '@/components/AboutContent';

export default function About() {
  return (
    <div className="h-screen overflow-hidden relative"
      style={{
        backgroundImage: "url('/images/暴雨将至.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}>
      {/* 下雨特效 */}
      <RainEffect />
      
      {/* 返回按钮 */}
      <BackButton />
      
      {/* 主要内容区域 - 左侧 */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-96 z-20">
        <DecorativeBorder className="bg-black/20 backdrop-blur-sm">
          <AboutContent />
        </DecorativeBorder>
      </div>
    </div>
  )
}