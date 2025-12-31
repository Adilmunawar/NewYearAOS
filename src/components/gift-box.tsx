'use client';

import { useState, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function GiftBox({ onClick }: GiftBoxProps) {
  const [isLidFlipped, setIsLidFlipped] = useState(false);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isLidFlipped) return;
    setIsLidFlipped(true);

    try {
      const audio = new Audio('/opening-sound.mp3');
      audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }

    onClick(e);

    setTimeout(() => {
      setIsLidFlipped(false);
    }, 1200);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-48 h-48 cursor-pointer flex items-end justify-center animate-bob"
      style={{ animationDelay: `${Math.random() * 2}s`, animationDuration: `${8 + Math.random() * 4}s` }}
    >
      <div className="relative w-36 h-32 group-hover:animate-aggressive-shake">
        {/* Box Base */}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-br from-secondary to-card border-2 border-primary/50 rounded-md shadow-lg"></div>
        {/* Box Ribbon Vertical */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-full bg-primary/80"></div>
        
        {/* Lid */}
        <div
          className={cn(
            'absolute -top-4 left-1/2 -translate-x-1/2 w-[152px] h-8 bg-gradient-to-b from-primary to-yellow-500 rounded-t-md transition-transform duration-500 ease-out origin-bottom-right z-10',
            isLidFlipped && '-rotate-[120deg] translate-x-12 -translate-y-8'
          )}
        >
            {/* Lid Ribbon Horizontal */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-4 bg-primary/80"></div>
        </div>

        {/* Ribbon Bow */}
         <div className={cn(
            "absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 z-20 transition-transform duration-500 ease-out",
            isLidFlipped && 'scale-0 rotate-180'
            )}>
            <div className="absolute -left-2 top-0 w-6 h-6 bg-primary rounded-full -rotate-45"></div>
            <div className="absolute -right-2 top-0 w-6 h-6 bg-primary rounded-full rotate-45"></div>
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
