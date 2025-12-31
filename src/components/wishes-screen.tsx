'use client';

import { useEffect } from 'react';
import { Button } from './ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';
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

  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};

export default function WishesScreen({ wishes, onDone }: WishesScreenProps) {
  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-50 bg-background overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-bob" style={{animationDuration: '15s'}}></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-1/2 translate-y-1/2 animate-bob" style={{animationDuration: '12s'}}></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center animate-fade-in-up">
            <Sparkles className="w-16 h-16 text-primary mb-4 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-black text-white">Happy New Year!</h1>
            <p className="mt-4 text-xl text-primary text-glow-gold">"{wishes.quote}"</p>
            <p className="mt-8 text-lg text-white/80 leading-relaxed">
                {wishes.wish}
            </p>
            <Button
                onClick={onDone}
                variant="outline"
                className="mt-12 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary backdrop-blur-sm bg-black/20"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Button>
        </div>
    </div>
  );
}
