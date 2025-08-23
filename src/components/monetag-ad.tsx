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
      try {
        // Check if adCode contains HTML tags (like <script> tags)
        if (adCode.includes('<script') || adCode.includes('</script>')) {
          // Handle HTML ad codes by setting innerHTML directly
          adRef.current.innerHTML = adCode;
        } else {
          // Handle pure JavaScript ad codes
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.text = adCode;
          script.async = true;
          
          // Append the script to the ad container
          adRef.current.appendChild(script);
        }
      } catch (error) {
        console.error('Error loading ad:', error);
        // Fallback: try setting as innerHTML
        if (adRef.current) {
          adRef.current.innerHTML = adCode;
        }
      }
      
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
