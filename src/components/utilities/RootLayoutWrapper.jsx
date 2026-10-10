'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/utilities/LoadingScreen';

export default function RootLayoutWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}
