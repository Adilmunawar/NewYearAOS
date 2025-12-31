'use client';

import { useState, useRef, type MouseEvent, type FormEvent } from 'react';
import type { UserData } from '@/app/page';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Map, Landmark } from 'lucide-react';
import Image from 'next/image';
import InteractiveLogo from './interactive-logo';

interface LandingScreenProps {
  onEnter: (data: UserData) => void;
  isExiting: boolean;
}

const DepartmentCard = ({
  department,
  icon: Icon,
  title,
  description,
  selected,
  onSelect,
  glowClass,
  shadowClass,
}: {
  department: UserData['department'];
  icon: React.ElementType;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  glowClass: string;
  shadowClass: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // Disable on mobile
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const rotateX = (-y / height) * 15;
    const rotateY = (x / width) * 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className={cn(
        'relative w-full max-w-[150px] h-48 md:max-w-[200px] md:w-56 md:h-64 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform-style-3d bg-black/20 backdrop-blur-md border',
        selected ? 'border-primary ring-2 ring-primary' : 'border-white/10',
        `hover:${shadowClass} hover:border-primary`
      )}
    >
      <div className="transform-style-3d transform translate-z-20 text-center">
        <Icon className={cn('mx-auto h-8 w-8 md:h-12 md:w-12 mb-2 transition-colors duration-300', selected ? 'text-primary' : 'text-white/80', `group-hover:${glowClass}`)} />
        <h3 className={cn('text-sm md:text-xl font-bold transition-colors duration-300', selected ? 'text-primary text-glow-gold' : 'text-white')}>{title}</h3>
        <p className="text-white/60 mt-1 text-xs md:text-sm">{description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-50"></div>
    </div>
  );
};


export default function LandingScreen({ onEnter, isExiting }: LandingScreenProps) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState<UserData['department'] | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ variant: 'destructive', title: 'Who are you?', description: 'Please enter your name to join the party.' });
      return;
    }
    if (!department) {
      toast({ variant: 'destructive', title: 'Where do you belong?', description: 'Please select your department.' });
      return;
    }
    onEnter({ name, department });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-2">
      {/* Background Split Panels */}
      <div className={cn("absolute top-0 left-0 w-full h-1/2 bg-background transition-transform duration-1000 ease-in-out", isExiting ? '-translate-y-full' : 'translate-y-0')}></div>
      <div className={cn("absolute bottom-0 left-0 w-full h-1/2 bg-background transition-transform duration-1000 ease-in-out", isExiting ? 'translate-y-full' : 'translate-y-0')}></div>

      <div className={cn("z-10 w-full max-w-5xl mx-auto px-4 transition-all duration-500 ease-in-out", isExiting ? 'opacity-0 scale-90' : 'opacity-100 scale-100 delay-300')}>
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
          
          {/* Left Column: Logo */}
          <div className="hidden md:flex flex-col justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
             <InteractiveLogo />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col items-center justify-center">
             {/* Logo for mobile */}
            <div className="md:hidden flex flex-col justify-center items-center animate-fade-in-up mb-4" style={{ animationDelay: '0.3s' }}>
               <InteractiveLogo />
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md md:max-w-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative p-4 sm:p-6 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent"></div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <Input
                    type="text"
                    placeholder="Enter your name, hero..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full max-w-xs sm:max-w-sm h-12 text-center text-lg bg-black/30 border-white/20 focus:ring-primary focus:border-primary placeholder:text-white/40"
                  />

                  <div className="flex gap-4">
                    <DepartmentCard
                      department="GIS"
                      icon={Map}
                      title="GIS Dept."
                      description="Titans of topology."
                      selected={department === 'GIS'}
                      onSelect={() => setDepartment('GIS')}
                      glowClass="text-neon-green"
                      shadowClass="shadow-[0_0_25px_theme(colors.neon-green/0.4)]"
                    />
                    <DepartmentCard
                      department="PLRA"
                      icon={Landmark}
                      title="PLRA Dept."
                      description="Legends of land."
                      selected={department === 'PLRA'}
                      onSelect={() => setDepartment('PLRA')}
                      glowClass="text-golden-amber"
                      shadowClass="shadow-[0_0_25px_theme(colors.golden-amber/0.4)]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-10 text-base font-bold bg-primary text-primary-foreground rounded-full transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:tracking-wider hover:shadow-[0_0_20px_hsl(var(--primary))] active:scale-100"
                  >
                    Enter the Party
                  </Button>
                </div>
                 {/* Gold shimmer effect */}
                <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-l from-transparent to-primary/10 animate-shimmer"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
