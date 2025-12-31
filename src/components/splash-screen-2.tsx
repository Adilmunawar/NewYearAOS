'use client';

import Image from 'next/image';

interface SplashScreenProps {
  onReady: () => void;
}

export default function SplashScreen2({ onReady }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-40 animate-fade-out" style={{ animationFillMode: 'forwards', animationDelay: '5.5s' }}>
      <div className="w-64 h-64 md:w-80 md:h-80 animate-fade-in-up relative">
        <Image 
          src="/kiya.gif" 
          alt="Confused person GIF" 
          layout="fill" 
          objectFit="contain" 
          unoptimized 
          onLoad={onReady}
          priority
        />
      </div>
      <p className="mt-8 text-white/80 text-lg md:text-xl font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Kiya lene aeee hoo idhar?
      </p>
    </div>
  );
}
