'use client';

import Image from 'next/image';

interface SplashScreenProps {
  onReady: () => void;
}

export default function SplashScreen({ onReady }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50 animate-fade-out" style={{ animationFillMode: 'forwards', animationDelay: '3.5s' }}>
      <div className="w-64 h-64 md:w-80 md:h-80 animate-fade-in-up relative">
        <Image 
          src="/server%20trafic.gif" 
          alt="Server traffic animation" 
          layout="fill" 
          objectFit="contain" 
          unoptimized 
          onLoad={onReady}
        />
      </div>
      <p className="mt-8 text-white/80 text-lg md:text-xl font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Arry itne ziada log agaey site py
      </p>
    </div>
  );
}
