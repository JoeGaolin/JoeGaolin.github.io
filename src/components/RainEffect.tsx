'use client';

import { useEffect, useRef } from 'react';

export default function RainEffect() {
  const rainBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rainBox = rainBoxRef.current;
    if (!rainBox) return;

    let boxHeight = rainBox.clientHeight;
    let boxWidth = rainBox.clientWidth;

    // 页面大小发生变化时，改变盒子大小
    const handleResize = () => {
      boxHeight = rainBox.clientHeight;
      boxWidth = rainBox.clientWidth;
    };

    window.addEventListener('resize', handleResize);

    // 每隔一段时间,添加雨滴
    const rainInterval = setInterval(() => {
      const rain = document.createElement('div');
      rain.className = 'rain';
      rain.style.top = '0px';
      // 随机刷新雨点位置
      rain.style.left = Math.random() * boxWidth + 'px';
      // 随机雨点透明度
      rain.style.opacity = Math.random().toString();
      
      rainBox.appendChild(rain);

      // 每隔一段时间,雨水下落
      let race = 1;
      const timer = setInterval(() => {
        // 判断"雨滴"元素的top属性是否超出"盒子"元素的高度来决定是否停止动画
        const currentTop = parseInt(rain.style.top);
        if (currentTop > boxHeight) {
          clearInterval(timer);
          rainBox.removeChild(rain);
        } else {
          // 每次定时器执行时，"雨滴"元素的top值会逐渐增加，
          // 并且增加的速率会随着时间的推移而逐渐加快
          race++;
          rain.style.top = currentTop + race + 'px';
        }
      }, 20);
    }, 50);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(rainInterval);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .rain {
            position: absolute;
            width: 2px;
            height: 50px;
            background: linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.6));
            pointer-events: none;
          }
        `
      }} />
      <div
        ref={rainBoxRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'transparent' }}
      />
    </>
  );
}