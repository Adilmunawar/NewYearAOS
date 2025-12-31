'use client';

import { PartyPopper, Linkedin, Code, Briefcase } from 'lucide-react';
import { Button } from './ui/button';

const triggerConfettiBlast = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const audio = new Audio('/opening-sound.mp3');
      audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
    
    if (window.confetti && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      window.confetti({
        particleCount: 200,
        spread: 90,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        scalar: 1.3,
        colors: ['#FFBF00', '#FFD700', '#FFFFFF', '#facc15'],
      });
    }
}

interface EndScreenProps {
  onRestart: () => void;
}

export default function EndScreen({ onRestart }: EndScreenProps) {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-50 bg-background overflow-hidden animate-fade-in">
        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white/80">
              Challo ab choup karke ke kamm karro,
            </h1>
            <p className="mt-4 text-2xl md:text-3xl text-primary text-glow-gold">
              Aj ke liey kafi ha!
            </p>

            <Button
                onClick={triggerConfettiBlast}
                className="mt-8 bg-primary text-primary-foreground rounded-full h-14 px-8 text-lg font-bold transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary))] active:scale-100"
            >
                <PartyPopper className="mr-2 h-6 w-6" />
                One Last Blast
            </Button>

            <div className="mt-12 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <p className="text-white/70">Visit the developer who gave you a little smile today</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a href="https://www.linkedin.com/in/adilmunawar/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
                    <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                  </Button>
                </a>
                 <a href="https://leetcode.com/u/AdilMunawar/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
                    <Code className="mr-2 h-5 w-5" /> LeetCode
                  </Button>
                </a>
                 <a href="https://adilmunawar.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
                    <Briefcase className="mr-2 h-5 w-5" /> Portfolio
                  </Button>
                </a>
              </div>
            </div>
        </div>
    </div>
  );
}
