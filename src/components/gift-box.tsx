'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

const triggerConfettiAt = (x: number, y: number) => {
    if (typeof window.confetti !== 'function') return;

    const rect = {
        x: x / window.innerWidth,
        y: y / window.innerHeight
    };

    window.confetti({
        particleCount: 100,
        spread: 70,
        origin: rect,
        colors: ['#FFBF00', '#FFD700', '#FFFFFF', '#facc15']
    });
};

export default function GiftBox({ onClick }: GiftBoxProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768 || isAnimating) return;
    const box = boxRef.current;
    if (!box) return;

    const { left, top, width, height } = box.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const rotateX = (-y / height) * 10;
    const rotateY = (x / width) * 10;

    box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    const box = boxRef.current;
    if (!box) return;
    box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isAnimating) return;
    
    e.stopPropagation(); // Prevent event bubbling
    triggerConfettiAt(e.clientX, e.clientY);

    setIsAnimating(true);
    setIsOpened(true);

    setTimeout(() => {
      onClick(e);
    }, 600);

    setTimeout(() => {
      setIsOpened(false);
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div
      ref={boxRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative w-48 h-48 cursor-pointer flex items-center justify-center transform-style-3d transition-transform duration-300",
        !isAnimating && 'hover:animate-aggressive-shake',
        `animate-bob`
      )}
      style={{
          animationDuration: `${8 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 2}s`
      }}
    >
      <div className={cn("relative w-32 h-32 transform-style-3d", isAnimating ? 'animate-shake' : '')}>
        {/* Lid */}
        <div className={cn(
            "absolute w-full h-full transform-style-3d",
            isOpened && "animate-lid-explode"
        )}>
            {/* Lid Top */}
            <div className="absolute w-32 h-32 bg-gradient-to-b from-primary to-yellow-600 transform -translate-y-1/2 rotate-x-90">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-6 bg-primary/80"></div>
            </div>
            {/* Lid Front */}
            <div className="absolute w-32 h-6 bg-primary transform translate-y-[-12px] translate-z-16"></div>
            {/* Lid Back */}
            <div className="absolute w-32 h-6 bg-primary transform translate-y-[-12px] -translate-z-16 rotate-x-180"></div>
            {/* Lid Left */}
            <div className="absolute w-32 h-6 bg-primary transform translate-y-[-12px] left-[-48px] rotate-y-90"></div>
            {/* Lid Right */}
            <div className="absolute w-32 h-6 bg-primary transform translate-y-[-12px] right-[-48px] rotate-y-90"></div>
            {/* Ribbon Bow */}
            <div className={cn(
                "absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-10 transform-style-3d z-20",
                isOpened && 'animate-bow-fly'
                )}>
                <div className="absolute -left-3 top-0 w-6 h-8 bg-primary rounded-full -rotate-45 origin-bottom-right"></div>
                <div className="absolute -right-3 top-0 w-6 h-8 bg-primary rounded-full rotate-45 origin-bottom-left"></div>
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
        </div>

        {/* Box Base */}
        <div className="absolute w-full h-full transform-style-3d">
            {/* Front */}
            <div className="absolute w-32 h-32 bg-secondary transform translate-z-16">
                 <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-primary/80"></div>
            </div>
            {/* Back */}
            <div className="absolute w-32 h-32 bg-secondary transform -translate-z-16 rotate-y-180">
                 <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-primary/80"></div>
            </div>
            {/* Left */}
            <div className="absolute w-32 h-32 bg-secondary transform rotate-y--90 translate-x--16">
                 <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-primary/80"></div>
            </div>
             {/* Right */}
            <div className="absolute w-32 h-32 bg-secondary transform rotate-y-90 translate-x-16">
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-full bg-primary/80"></div>
            </div>
            {/* Bottom */}
            <div className="absolute w-32 h-32 bg-card transform rotate-x-90 translate-y-16"></div>
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
      </div>
    </div>
  );
}
