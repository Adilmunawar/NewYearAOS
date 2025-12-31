'use client';

import { useState } from 'react';
import LandingScreen from '@/components/landing-screen';
import Dashboard from '@/components/dashboard';

export type UserData = {
  name: string;
  department: 'GIS' | 'PLRA';
};

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = (data: UserData) => {
    setIsExiting(true);
    setTimeout(() => {
      setUserData(data);
    }, 1200); // Duration of the exit animation
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {!userData && <LandingScreen onEnter={handleEnter} isExiting={isExiting} />}
      {userData && <Dashboard user={userData} />}
    </div>
  );
}
