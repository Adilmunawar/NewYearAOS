'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DigitProps {
  value: string;
  isFlipping: boolean;
}

const Digit = ({ value, isFlipping }: DigitProps) => (
  <div
    className={cn(
      'relative h-24 w-16 md:h-40 md:w-28 flex items-center justify-center bg-card rounded-lg shadow-inner text-6xl md:text-8xl font-black text-primary text-glow-gold perspective',
      { 'flip-card': isFlipping }
    )}
    style={{ backfaceVisibility: 'hidden' }}
  >
    <div className="absolute top-0 left-0 w-full h-1/2 bg-black/30 rounded-t-lg"></div>
    <span className="relative z-10">{value}</span>
    <div className="absolute h-[2px] w-full bg-black/50 top-1/2 -translate-y-1/2 z-20"></div>
  </div>
);


interface CountdownProps {
  startYear: number;
  endYear: number;
  onComplete: () => void;
}

export default function Countdown({ startYear, endYear, onComplete }: CountdownProps) {
  const [year, setYear] = useState(startYear);
  const [flippingDigits, setFlippingDigits] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    if (year >= endYear) {
      setTimeout(onComplete, 1000);
      return;
    }

    const currentYearStr = year.toString().padStart(4, '0');
    const nextYear = year + 1;
    const nextYearStr = nextYear.toString().padStart(4, '0');

    const timeout = setTimeout(() => {
      const flips = currentYearStr.split('').map((digit, i) => digit !== nextYearStr[i]);
      setFlippingDigits(flips);
      setYear(nextYear);
    }, 70); // Adjust speed here

    return () => clearTimeout(timeout);
  }, [year, endYear, onComplete]);
  
  useEffect(() => {
     if (flippingDigits.some(f => f)) {
        const timer = setTimeout(() => setFlippingDigits([false, false, false, false]), 500); // match animation duration
        return () => clearTimeout(timer);
     }
  }, [flippingDigits]);

  const yearDigits = year.toString().padStart(4, '0').split('');

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50 animate-fade-in">
      <div className="flex gap-2 md:gap-4" >
        {yearDigits.map((digit, index) => (
          <Digit key={index} value={digit} isFlipping={flippingDigits[index]} />
        ))}
      </div>
       {year === endYear && (
        <h2 className="mt-8 text-2xl md:text-4xl font-bold text-white text-glow-gold animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          Happy New Year
        </h2>
      )}
    </div>
  );
}
