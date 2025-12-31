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

  const fire = (particleRatio: number, opts: any) => {
    window.confetti?.({
      ...opts,
      particleCount: Math.floor(100 * particleRatio), // Reduced from 200
    });
  };

  // Initial burst (less intense)
  fire(0.8, { spread: 26, startVelocity: 55, origin: { x: 0, y: 1 } });
  fire(0.8, { spread: 26, startVelocity: 55, origin: { x: 1, y: 1 } });

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 25 * (timeLeft / duration); // Reduced from 50
    
    // Poppers from corners
    window.confetti({ particleCount, angle: 60, spread: 55, origin: { x: 0, y: 1 }, colors });
    window.confetti({ particleCount, angle: 120, spread: 55, origin: { x: 1, y: 1 }, colors });

    // Rain from top (less frequent)
    if (Date.now() % 5 === 0) {
        window.confetti({ particleCount: particleCount / 2, spread: 360, ticks: 60, zIndex: 0, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }, colors });
    }

  }, 450); // Increased interval from 350
};

export default function WishesScreen({ wishes, onDone }: WishesScreenProps) {
  useEffect(() => {
    triggerConfetti();
    const timer = setTimeout(() => {
      onDone();
    }, 8000); // Automatically go back after 8 seconds

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-50 bg-background overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-bob" style={{animationDuration: '15s'}}></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-1/2 translate-y-1/2 animate-bob" style={{animationDuration: '12s'}}></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center animate-fade-in-up">
            <div className="flex gap-4">
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.2s'}} />
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.4s'}} />
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.6s'}} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-6">Happy New Year 2026!</h1>
            <p className="mt-4 text-base md:text-xl text-primary text-glow-gold">"{wishes.quote}"</p>
            <p className="mt-6 md:mt-8 text-sm md:text-lg text-white/80 leading-relaxed">
                {wishes.wish}
            </p>
        </div>
    </div>
  );
}
