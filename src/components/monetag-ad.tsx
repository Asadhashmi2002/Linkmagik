'use client';

import { useEffect, useRef } from 'react';

interface MonetagAdProps {
  adCode: string;
  className?: string;
}

export default function MonetagAd({ adCode, className = '' }: MonetagAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && adCode) {
      // Create a script element for the ad code
      const script = document.createElement('script');
      script.innerHTML = adCode;
      script.async = true;
      
      // Append the script to the ad container
      adRef.current.appendChild(script);
      
      // Cleanup function
      return () => {
        if (adRef.current) {
          adRef.current.innerHTML = '';
        }
      };
    }
  }, [adCode]);

  return (
    <div 
      ref={adRef} 
      className={`monetag-ad-container ${className}`}
    />
  );
}
