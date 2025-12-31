'use client';

import { PartyPopper, Linkedin, Code, User } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

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

export default function EndScreen() {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-50 bg-background overflow-auto animate-fade-in">
        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white/80">
              Challo ab choup karke ke kamm karro,
            </h1>
            <p className="mt-2 text-xl sm:text-2xl md:text-3xl text-primary text-glow-gold">
              Aj ke liey kafi ha!
            </p>

            <Button
                onClick={triggerConfettiBlast}
                className="mt-8 bg-primary text-primary-foreground rounded-full h-12 px-6 sm:h-14 sm:px-8 text-base sm:text-lg font-bold transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary))] active:scale-100"
            >
                <PartyPopper className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                One Last Blast
            </Button>

            <div className="mt-12 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="relative w-full max-w-xs sm:max-w-sm mx-auto mb-4">
                <Image src="/image.png" alt="Codebase commit history" width={500} height={200} className="rounded-lg shadow-lg" />
              </div>
              <p className="text-white/70 max-w-xs sm:max-w-md mx-auto text-sm sm:text-base">
                Meet the developer who gave you a tiny biny joy with his 8714 lines of code, one night debug and 66 commits.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
                <a href="https://www.linkedin.com/in/adilmunawar/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
                    <Linkedin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> LinkedIn
                  </Button>
                </a>
                 <a href="https://leetcode.com/u/AdilMunawar/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
                    <Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> LeetCode
                  </Button>
                </a>
                 <a href="https://adilmunawar.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-primary/50 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105">
                    <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Portfolio
                  </Button>
                </a>
              </div>
            </div>
        </div>
    </div>
  );
}
