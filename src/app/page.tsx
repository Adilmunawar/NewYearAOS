'use client';

import { useState, useEffect, useCallback } from 'react';
import LandingScreen from '@/components/landing-screen';
import Dashboard from '@/components/dashboard';
import SplashScreen from '@/components/splash-screen';
import SplashScreen2 from '@/components/splash-screen-2';

export type UserData = {
  name: string;
  department: 'GIS' | 'PLRA';
};

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('splash1'); // 'splash1', 'splash2', 'landing', 'dashboard'
  const [isSplash1Ready, setIsSplash1Ready] = useState(false);
  const [isSplash2Ready, setIsSplash2Ready] = useState(false);

  useEffect(() => {
    if (currentScreen === 'splash1' && isSplash1Ready) {
      const timer = setTimeout(() => {
        setCurrentScreen('splash2');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, isSplash1Ready]);

  useEffect(() => {
    if (currentScreen === 'splash2' && isSplash2Ready) {
      const timer = setTimeout(() => {
        setCurrentScreen('landing');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, isSplash2Ready]);

  const handleSplash1Ready = useCallback(() => {
    setIsSplash1Ready(true);
  }, []);

  const handleSplash2Ready = useCallback(() => {
    setIsSplash2Ready(true);
  }, []);

  const handleEnter = (data: UserData) => {
    setIsExiting(true);
    setTimeout(() => {
      setUserData(data);
      setCurrentScreen('dashboard');
    }, 1200); // Duration of the exit animation
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash1':
        return <SplashScreen onReady={handleSplash1Ready} />;
      case 'splash2':
        return <SplashScreen2 onReady={handleSplash2Ready} />;
      case 'landing':
        return <LandingScreen onEnter={handleEnter} isExiting={isExiting} />;
      case 'dashboard':
        return userData ? <Dashboard user={userData} /> : null;
      default:
        return <SplashScreen onReady={handleSplash1Ready} />;
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {renderScreen()}
    </div>
  );
}
