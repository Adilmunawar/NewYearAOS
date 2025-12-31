'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onClick: () => void;
}

export default function GiftBox({ onClick }: GiftBoxProps) {
  const [isLidFlipped, setIsLidFlipped] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) return;
    setIsLidFlipped(true);
    setIsClicked(true);

    setTimeout(() => {
        onClick();
    }, 400); // Let lid animation play a bit

    setTimeout(() => {
      setIsLidFlipped(false);
      setIsClicked(false);
    }, 1500); // Reset after full animation
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-48 h-48 cursor-pointer flex items-end justify-center animate-bob"
      style={{ animationDelay: `${Math.random() * 2}s`, animationDuration: `${8 + Math.random() * 4}s` }}
    >
      {/* Sparkles on click */}
      {isClicked && (
        <>
          <div className="absolute top-0 left-1/2 w-1 h-4 bg-primary rounded-full animate-sparkle-1"></div>
          <div className="absolute top-0 left-1/2 w-1 h-3 bg-white rounded-full animate-sparkle-2"></div>
          <div className="absolute top-0 left-1/2 w-1.5 h-3.5 bg-primary rounded-full animate-sparkle-3"></div>
        </>
      )}

      <div className={cn("relative w-36 h-32 transition-transform duration-300", isClicked ? 'scale-105' : 'group-hover:scale-110')}>
        {/* Box Base */}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-br from-secondary to-background border-2 border-primary/30 rounded-md shadow-lg"></div>
        
        {/* Box Ribbon Vertical */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-full bg-primary/80 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        {/* Lid */}
        <div
          className={cn(
            'absolute -top-4 left-1/2 -translate-x-1/2 w-[152px] h-8 bg-gradient-to-b from-primary to-yellow-600 rounded-t-md transition-transform duration-500 ease-out origin-bottom-right',
            isLidFlipped && 'animate-lid-flip'
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
             "absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-10 transition-transform duration-500",
             isLidFlipped && 'animate-bow-fly'
            )}>
            <div className="absolute -left-3 top-0 w-6 h-8 bg-primary rounded-full -rotate-45 origin-bottom-right"></div>
            <div className="absolute -right-3 top-0 w-6 h-8 bg-primary rounded-full rotate-45 origin-bottom-left"></div>
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center w-20 h-20 bg-background/50 rounded-full backdrop-blur-sm">
                <Gift className="w-10 h-10 text-primary" />
            </div>
        </div>

      </div>
    </div>
  );
}
