'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setCurrentScreen('landing');
    }, 4000);

    return () => clearTimeout(splashTimer);
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
        return <SplashScreen />;
      case 'landing':
        return <LandingScreen onEnter={handleEnter} isExiting={isExiting} />;
      case 'dashboard':
        return userData ? <Dashboard user={userData} /> : null;
      default:
        return <SplashScreen />;
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {renderScreen()}
    </div>
  );
}
