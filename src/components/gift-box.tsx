'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onClick: () => void;
}

export default function GiftBox({ onClick }: GiftBoxProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsOpened(true);

    // Callback after animation starts
    setTimeout(() => {
        onClick();
    }, 600); 

    // Reset state after animation finishes to allow re-triggering
    setTimeout(() => {
      setIsOpened(false);
      setIsAnimating(false);
    }, 2000); 
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative w-48 h-48 cursor-pointer flex items-end justify-center perspective-[1000px]",
        isAnimating ? '' : 'hover:[&>div]:-translate-y-2'
      )}
      style={{
        animation: isAnimating ? 'none' : `bob ${8 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`
      }}
    >
      <div className={cn(
        "relative w-36 h-32 transition-transform duration-300 transform-style-3d",
        isAnimating ? '' : 'group-hover:scale-105',
        isOpened ? 'animate-shake' : ''
      )}>
        {/* Box Base */}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-br from-secondary to-background border-2 border-primary/30 rounded-md shadow-lg">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,hsla(var(--primary)/0.1),transparent_50%,hsla(var(--primary)/0.1)_100%)]"></div>
        </div>
        
        {/* Box Ribbon Vertical */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-full bg-primary/80 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        {/* Lid */}
        <div
          className={cn(
            'absolute -top-4 left-1/2 -translate-x-1/2 w-[152px] h-8 bg-gradient-to-b from-primary to-yellow-600 rounded-t-md transition-transform duration-500 ease-out origin-bottom-right',
            'transform-style-3d',
            isOpened && 'animate-lid-flip'
          )}
        >
            <div className="absolute w-full h-1 -bottom-1 bg-yellow-800/50 rounded-b-md"></div>
            {/* Lid Ribbon Horizontal */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-4 bg-primary/80 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-t from-transparent via-white/20 to-transparent"></div>
            </div>
        </div>

        {/* Ribbon Bow */}
         <div className={cn(
             "absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-10 transition-transform duration-500 transform-style-3d",
             isOpened && 'animate-bow-fly'
            )}>
            <div className="absolute -left-3 top-0 w-6 h-8 bg-primary rounded-full -rotate-45 origin-bottom-right"></div>
            <div className="absolute -right-3 top-0 w-6 h-8 bg-primary rounded-full rotate-45 origin-bottom-left"></div>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
        </div>

        {/* Click Prompt Icon */}
        <div className={cn(
            "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300",
            !isAnimating && "group-hover:opacity-100"
        )}>
            <div className="flex items-center justify-center w-20 h-20 bg-background/50 rounded-full backdrop-blur-sm">
                <Gift className="w-10 h-10 text-primary" />
            </div>
        </div>

        {/* Sparkles */}
        {isOpened && Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full animate-sparkle"
            style={{
              '--angle': `${i * 30}deg`,
              '--distance': `${40 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 0.3}s`
            }}
          />
        ))}

      </div>
    </div>
  );
}
