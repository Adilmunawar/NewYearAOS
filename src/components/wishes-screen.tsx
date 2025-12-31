'use client';

import { useEffect } from 'react';
import { PartyPopper } from 'lucide-react';

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
      particleCount: Math.floor(100 * particleRatio),
    });
  };

  fire(0.8, { spread: 26, startVelocity: 55, origin: { x: 0, y: 1 } });
  fire(0.8, { spread: 26, startVelocity: 55, origin: { x: 1, y: 1 } });

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 25 * (timeLeft / duration);
    
    window.confetti({ particleCount, angle: 60, spread: 55, origin: { x: 0, y: 1 }, colors });
    window.confetti({ particleCount, angle: 120, spread: 55, origin: { x: 1, y: 1 }, colors });

    if (Date.now() % 5 === 0) {
        window.confetti({ particleCount: particleCount / 2, spread: 360, ticks: 60, zIndex: 0, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }, colors });
    }

  }, 450);
};

const Star = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute w-1 h-1 bg-white rounded-full animate-fade-in-out" style={style}></div>
);

export default function WishesScreen({ wishes, onDone }: WishesScreenProps) {
  useEffect(() => {
    triggerConfetti();
    const timer = setTimeout(() => {
      onDone();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onDone]);
  
  const stars = Array.from({ length: 50 }).map((_, i) => {
    const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
    };
    return <Star key={i} style={style} />;
  });


  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-50 bg-background overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-70">
            {stars}
        </div>

        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center animate-fade-in-up">
            <div className="flex gap-4">
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.2s'}} />
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.4s'}} />
              <PartyPopper className="w-10 h-10 md:w-16 md:h-16 text-primary animate-shake" style={{animationDelay: '0.6s'}} />
            </div>
            
            <div className="relative mt-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white relative z-10">Happy New Year 2026!</h1>
                <h1 
                    className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary animate-shimmer bg-[length:200%_auto] z-20"
                    style={{ backgroundPosition: '200% 0' }}
                >
                    Happy New Year 2026!
                </h1>
            </div>

            <p className="mt-4 text-base md:text-xl text-primary text-glow-gold">"{wishes.quote}"</p>
            <p className="mt-6 md:mt-8 text-sm md:text-lg text-white/80 leading-relaxed">
                {wishes.wish}
            </p>
        </div>
    </div>
  );
}