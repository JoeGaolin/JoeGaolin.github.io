'use client';

import Link from 'next/link';

export default function BackButton() {
  return (
    <Link 
      href="/"
      className="absolute top-6 left-120 z-30 group"
    >
      <div className="flex items-center space-x-2 px-4 py-2 bg-black/20 backdrop-blur-sm border border-gray-600/30 rounded-lg hover:bg-black/40 transition-all duration-300">
        <svg 
          className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        <span className="text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
          返回主页
        </span>
      </div>
    </Link>
  );
}