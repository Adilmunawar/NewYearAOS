'use client';

import { useState, useEffect, useMemo, useCallback, type MouseEvent } from 'react';
import type { UserData } from '@/app/page';
import { jokes, roasts, newYearWishes } from '@/lib/data';
import { Button } from './ui/button';
import { PartyPopper, RefreshCw, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Typewriter from './typewriter';
import GiftBox from './gift-box';
import WishesScreen from './wishes-screen';
import Countdown from './countdown';
import ZipPuzzle, { puzzles } from './zip-puzzle';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import EndScreen from './end-screen';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const GIFT_COST = 10;

export default function Dashboard({ user }: { user: UserData }) {
  const [jokesRemaining, setJokesRemaining] = useState<string[]>([]);
  const [jokeHistory, setJokeHistory] = useState<string[]>([]);
  const [currentJoke, setCurrentJoke] = useState<string>('');
  const [isJokeModalOpen, setIsJokeModalOpen] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [credits, setCredits] = useState(0);
  const [isPuzzleModalOpen, setIsPuzzleModalOpen] = useState(false);
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState(0);
  const { toast } = useToast();
  
  const departmentJokes = useMemo(() => jokes[user.department] || [], [user.department]);
  const departmentWishes = useMemo(() => newYearWishes[user.department], [user.department]);

  const resetJokes = useCallback(() => {
    const shuffled = shuffleArray(departmentJokes);
    setJokesRemaining(shuffled);
    setJokeHistory([]);
  }, [departmentJokes]);

  useEffect(() => {
    resetJokes();
    setSelectedPuzzleIndex(Math.floor(Math.random() * puzzles.length));
  }, [resetJokes]);

  const handlePuzzleSolve = () => {
    const newCredits = credits + GIFT_COST;
    setCredits(newCredits);
    setIsPuzzleModalOpen(false);
    toast({
      title: 'Puzzle Solved!',
      description: `You've earned ${GIFT_COST} credits!`,
      className: 'bg-green-600/80 border-green-500 text-white',
    });
    // Select a new puzzle for the next time
    setSelectedPuzzleIndex(Math.floor(Math.random() * puzzles.length));
  };

  const getNewJoke = (e: MouseEvent<HTMLDivElement>) => {
    if (credits < GIFT_COST) {
      toast({
        variant: 'destructive',
        title: 'Insufficient Credits!',
        description: `You need ${GIFT_COST} credits to open a gift. Solve the puzzle to earn more.`,
      });
      setIsPuzzleModalOpen(true);
      return false; // Indicate failure
    }

    setCredits(prev => prev - GIFT_COST);
    
    try {
      const audio = new Audio('/opening-sound.mp3');
      audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
    
    if (window.confetti && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      window.confetti({
        particleCount: 150,
        spread: 80,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        scalar: 1.2,
        colors: ['#FFBF00', '#FFD700', '#FFFFFF', '#facc15'],
      });
    }

    if (jokesRemaining.length === 0) {
      const shuffled = shuffleArray(departmentJokes.filter(j => j !== currentJoke));
      setJokesRemaining(shuffled.slice(1));
      setJokeHistory([shuffled[0]]);
      setCurrentJoke(shuffled[0]);
    } else {
      const nextJoke = jokesRemaining[0];
      setCurrentJoke(nextJoke);
      setJokesRemaining(prev => prev.slice(1));
      setJokeHistory(prev => [...prev, nextJoke]);
    }
    setIsJokeModalOpen(true);
    return true; // Indicate success
  };
  
  const handleContinue = () => {
    setIsJokeModalOpen(false);
    setShowCountdown(true);
  };
  
  const handleCountdownComplete = useCallback(() => {
    setShowCountdown(false);
    setShowWishes(true);
  }, []);

  const handleWishesDone = useCallback(() => {
    setShowWishes(false);
    setShowEndScreen(true);
  }, []);
  
  const roastMessage = roasts[user.department] || "Welcome! You're so special, we don't have a roast for you.";

  if (showEndScreen) {
    return <EndScreen />;
  }

  if (showWishes) {
    return <WishesScreen wishes={departmentWishes} onDone={handleWishesDone} />;
  }

  if (showCountdown) {
    return <Countdown startYear={1947} endYear={2026} onComplete={handleCountdownComplete} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full animate-bob" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
      <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-primary/10 rounded-full animate-bob" style={{ animationDelay: '-2s', animationDuration: '12s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-secondary/20 rounded-full animate-bob" style={{ animationDelay: '-4s', animationDuration: '10s' }}></div>


      <header className={cn("w-full max-w-5xl text-center transition-opacity duration-500", 'animate-fade-in-up' )}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
          <span className="text-white/80">Welcome, </span>
          <span className="text-primary text-glow-gold"><Typewriter text={user.name} /></span>
        </h1>
        <p className="mt-4 text-white/60 text-base md:text-lg max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {roastMessage}
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center w-full mt-8 md:mt-12">
        <div className={cn("text-center mb-8 transition-opacity duration-500")}>
            <h2 className="text-2xl md:text-3xl font-bold text-white animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Your Joke Treasury</h2>
            <p className="text-white/50 animate-fade-in-up text-sm md:text-base" style={{ animationDelay: '0.5s' }}>Click a gift to reveal a treasure of questionable humor. Costs {GIFT_COST} credits.</p>
        </div>
        
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-2 px-4 rounded-full flex items-center gap-2 border border-primary/50 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-lg font-bold text-white">{credits}</span>
          <span className="text-sm text-white/70">Credits</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <GiftBox onClick={getNewJoke} />
          <GiftBox onClick={getNewJoke} />
          <GiftBox onClick={getNewJoke} />
        </div>
      </main>

      <footer className={cn("w-full flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 md:mt-12 transition-opacity duration-500")}>
        <Button onClick={resetJokes} variant="ghost" size="icon" aria-label="Reset Jokes">
            <RefreshCw className="h-5 w-5"/>
        </Button>
      </footer>
      
      <Dialog open={isJokeModalOpen} onOpenChange={setIsJokeModalOpen}>
        <DialogContent className="sm:max-w-md bg-black/30 backdrop-blur-xl border-primary/50 text-white mx-4">
          <DialogHeader>
            <DialogTitle className="text-primary text-glow-gold flex items-center gap-2">
              <PartyPopper />
              Here's a Joke For You!
            </DialogTitle>
            <DialogDescription className="text-white/70 pt-4 text-base md:text-lg text-center">
              {currentJoke}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button onClick={handleContinue} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPuzzleModalOpen} onOpenChange={setIsPuzzleModalOpen}>
        <DialogContent className="max-w-md w-full bg-black/30 backdrop-blur-xl border-primary/50 text-white mx-4 p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-primary text-glow-gold">Complete the Path</DialogTitle>
            <DialogDescription className="text-white/70">
              Click and drag from the blinking dot to connect the numbers in sequence and earn credits!
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <ZipPuzzle puzzleConfig={puzzles[selectedPuzzleIndex]} onSolve={handlePuzzleSolve} key={selectedPuzzleIndex} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
