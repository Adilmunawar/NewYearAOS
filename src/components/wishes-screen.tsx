'use client';

import { useEffect } from 'react';
import { PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WishesScreenProps {
  wishes: {
    quote: string;
    wish: string;
  };
  onDone: () => void;
}

const triggerConfetti = () => {
  if (typeof window.confetti !== 'function') return;

  const duration = 8 * 1000;
  const animationEnd = Date.now() + duration;
  
  const colors = ['#FFBF00', '#FFD700', '#FFFFFF', '#facc15'];

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const frame = () => {
    if (Date.now() > animationEnd) {
        return;
    }
    
    // Left side
    window.confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 1 },
      colors
    });
    // Right side
    window.confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 1 },
      colors
    });

    if (Date.now() % 3 === 0) {
        window.confetti({ particleCount: 1, spread: 360, ticks: 60, zIndex: 0, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }, colors });
    }

    requestAnimationFrame(frame);
  };
  
  frame();
};

const Star = ({ style, className }: { style: React.CSSProperties, className?: string }) => (
    <div className={cn("absolute w-1 h-1 bg-white rounded-full animate-twinkle", className)} style={style}></div>
);

export default function WishesScreen({ wishes, onDone }: WishesScreenProps) {
  useEffect(() => {
    triggerConfetti();
    const timer = setTimeout(() => {
      onDone();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onDone]);
  
  const createStars = (count: number, className: string) => Array.from({ length: count }).map((_, i) => {
    const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${3 + Math.random() * 5}s`,
    };
    return <Star key={`${className}-${i}`} style={style} className={className} />;
  });

  const stars1 = createStars(30, 'w-0.5 h-0.5 opacity-50 parallax-1');
  const stars2 = createStars(20, 'w-1 h-1 opacity-75 parallax-2');
  const stars3 = createStars(15, 'w-[3px] h-[3px] opacity-100 parallax-3');


  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-50 bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
            {stars1}
            {stars2}
            {stars3}
        </div>

        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center animate-fade-in-up">
            <div className="flex gap-4">
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.2s'}} />
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.4s'}} />
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.6s'}} />
            </div>
            
            <div className="relative mt-6 animate-text-breath">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white relative z-10">Happy New Year 2026!</h1>
                <h1 
                    className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary animate-shimmer bg-[length:200%_auto] z-20"
                    style={{ backgroundPosition: '200% 0' }}
                >
                    Happy New Year 2026!
                </h1>
            </div>

            <div className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <p className="mt-4 text-base md:text-xl text-primary text-glow-gold">"{wishes.quote}"</p>
              <p className="mt-6 md:mt-8 text-sm md:text-lg text-white/80 leading-relaxed max-w-2xl">
                  {wishes.wish}
              </p>
            </div>
        </div>
    </div>
  );
}
