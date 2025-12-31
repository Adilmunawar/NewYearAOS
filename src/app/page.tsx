'use client';

import { useState, useEffect, useCallback } from 'react';
import LandingScreen from '@/components/landing-screen';
import Dashboard from '@/components/dashboard';
import SplashScreen from '@/components/splash-screen';

export type UserData = {
  name: string;
  department: 'GIS' | 'PLRA';
};

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('splash'); // 'splash', 'landing', 'dashboard'
  const [isSplashReady, setIsSplashReady] = useState(false);

  useEffect(() => {
    if (!isSplashReady) return;

    const splashTimer = setTimeout(() => {
      setCurrentScreen('landing');
    }, 4000);

    return () => clearTimeout(splashTimer);
  }, [isSplashReady]);

  const handleSplashReady = useCallback(() => {
    setIsSplashReady(true);
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
      case 'splash':
        return <SplashScreen onReady={handleSplashReady} />;
      case 'landing':
        return <LandingScreen onEnter={handleEnter} isExiting={isExiting} />;
      case 'dashboard':
        return userData ? <Dashboard user={userData} /> : null;
      default:
        return <SplashScreen onReady={handleSplashReady} />;
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {renderScreen()}
    </div>
  );
}
