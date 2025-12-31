'use client';

import { useEffect } from 'react';

export default function EndScreen() {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-50 bg-background overflow-hidden animate-fade-in">
        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white/80">
              Challo ab choup karke ke kamm karro,
            </h1>
            <p className="mt-4 text-2xl md:text-3xl text-primary text-glow-gold">
              Aj ke liey kafi ha!
            </p>
        </div>
    </div>
  );
}
