'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdPage() {
  const router = useRouter();
  const [showFirstButton, setShowFirstButton] = useState(false);
  const [showSecondButton, setShowSecondButton] = useState(false);
  
  const [firstButtonClicked, setFirstButtonClicked] = useState(false);
  const [secondButtonClicked, setSecondButtonClicked] = useState(false);
  const [firstTimer, setFirstTimer] = useState(15);
  const [secondTimer, setSecondTimer] = useState(20);
  const [firstTimerActive, setFirstTimerActive] = useState(false);
  const [secondTimerActive, setSecondTimerActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    // Start time tracking immediately
    const startTime = Date.now();
    
    // Time tracking interval
    const timeInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsed);
      
      // Show first button immediately (no scroll requirement)
      if (!showFirstButton) {
        setShowFirstButton(true);
      }
      
      // Show second button after first timer completes
      if (firstButtonClicked && !firstTimerActive && !showSecondButton) {
        setShowSecondButton(true);
      }
    }, 1000);

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      setScrollDepth(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDepth, showFirstButton, firstButtonClicked, firstTimerActive, showSecondButton]);

  // Mobile-specific ad loading effect
  useEffect(() => {
    // Force ad reload on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Delay ad loading slightly for mobile
      const mobileAdTimer = setTimeout(() => {
        if ((window as any).AdProvider) {
          (window as any).AdProvider.push({"serve": {}});
        }
      }, 1000);

      // Force push notifications ad reload for mobile
      const pushAdTimer = setTimeout(() => {
        if ((window as any).AdProvider) {
          (window as any).AdProvider.push({"serve": {}});
        }
      }, 2000);

      // Force fullpage interstitial ad reload for mobile
      const interstitialTimer = setTimeout(() => {
        if ((window as any).AdProvider) {
          (window as any).AdProvider.push({"serve": {}});
        }
      }, 3000);

      return () => {
        clearTimeout(mobileAdTimer);
        clearTimeout(pushAdTimer);
        clearTimeout(interstitialTimer);
      };
    }
  }, []);

  // First timer effect (15 seconds)
  useEffect(() => {
    if (firstTimerActive && firstTimer > 0) {
      const timer = setTimeout(() => {
        setFirstTimer(prev => {
          if (prev <= 1) {
            setFirstTimerActive(false);
            setShowSecondButton(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [firstTimer, firstTimerActive]);

  // Second timer effect (20 seconds)
  useEffect(() => {
    if (secondTimerActive && secondTimer > 0) {
      const timer = setTimeout(() => {
        setSecondTimer(prev => {
          if (prev <= 1) {
            setSecondTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [secondTimer, secondTimerActive]);

  const handleFirstButton = () => {
    setFirstButtonClicked(true);
    setFirstTimerActive(true);
    setFirstTimer(15);
  };

  const handleSecondButton = () => {
    if (!secondButtonClicked) {
      setSecondButtonClicked(true);
      setSecondTimerActive(true);
      setSecondTimer(20);
    } else if (!secondTimerActive) {
      // Timer completed, redirect
      try {
        const destinationUrl = localStorage.getItem('destinationUrl') || 'https://google.com';
        window.location.href = destinationUrl;
      } catch (error) {
        window.location.href = 'https://google.com';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">LinkMagik</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300 space-y-1">
                <div className="text-yellow-400">
                  Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                </div>
                {scrollDepth > 0 && (
                  <div className="text-blue-400">Scroll: {scrollDepth}%</div>
                )}
                {!firstButtonClicked && (
                  <div className="text-emerald-400 font-bold">🎯 Start Button Ready!</div>
                )}
                {showSecondButton && !secondButtonClicked && (
                  <div className="text-emerald-400 font-bold">🎯 Download Button Ready!</div>
                )}
              </div>
              <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg text-center">
                <div>🎮 Simple Steps!</div>
                <div className="text-yellow-400 font-medium">Follow the buttons...</div>
                <div className="mt-1 text-xs">
                  {!firstButtonClicked ? (
                    <span>🎯 Click Start button at top</span>
                  ) : firstButtonClicked && firstTimerActive ? (
                    <span>⏰ Wait {firstTimer} seconds...</span>
                  ) : showSecondButton && !secondButtonClicked ? (
                    <span>📱 Scroll to bottom for Download button</span>
                  ) : secondButtonClicked && secondTimerActive ? (
                    <span>⏰ Wait {secondTimer} seconds...</span>
                  ) : (
                    <span>🎉 Click to redirect!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-2">
        {/* Scroll Progress Bar */}
        <div className="w-full bg-gray-700 h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 transition-all duration-300"
            style={{ width: `${scrollDepth}%` }}
          ></div>
        </div>
      </div>

      {/* Pure Ad-Maven & ExoClick Ads - No Cards, Simple Placeholders */}
      
      {/* ExoClick Banner Ad 1 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-red-500 to-pink-500 h-[100px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">ExoClick Banner Ad (320x100)</span>
          </div>
        </div>
      </div>

      {/* Ad-Maven Banner Ad 1 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-[100px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Ad-Maven Banner Ad (320x100)</span>
          </div>
        </div>
      </div>

      {/* ExoClick Mobile Fullpage Interstitial Ad */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-white/5 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
            {/* ExoClick Fullpage Interstitial Ad */}
            <div className="w-full">
              <script async type="application/javascript" src="https://a.pemsrv.com/ad-provider.js"></script> 
              <ins className="eas6a97888e33" data-zoneid="5715824" style={{display: 'block', width: '100%', height: '400px'}}></ins> 
              <script dangerouslySetInnerHTML={{__html: '(AdProvider = window.AdProvider || []).push({"serve": {}});'}}></script>
            </div>
            
            {/* Fallback for mobile if ad doesn't load */}
            <div className="text-center text-gray-400 text-sm mt-2">
              <p>Loading fullpage interstitial...</p>
              <p className="text-xs">Zone ID: 5715824</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad-Maven Interstitial Ad */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 h-[400px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-center">
              Ad-Maven Interstitial Ad<br/>
              (Full-screen mobile optimized)
            </span>
          </div>
        </div>
      </div>

      {/* Ad-Maven Banner Ad 2 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-[50px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Ad-Maven Banner Ad (320x50)</span>
          </div>
        </div>
      </div>

      {/* ExoClick Real Push Notifications Ad */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-white/5 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
            {/* ExoClick Push Notifications Ad */}
            <div className="w-full">
              <script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script> 
              <ins className="eas6a97888e42" data-zoneid="5715776" style={{display: 'block', width: '100%', height: '200px'}}></ins> 
              <script dangerouslySetInnerHTML={{__html: '(AdProvider = window.AdProvider || []).push({"serve": {}});'}}></script>
            </div>
            
            {/* Fallback for mobile if ad doesn't load */}
            <div className="text-center text-gray-400 text-sm mt-2">
              <p>Loading push notifications...</p>
              <p className="text-xs">Zone ID: 5715776</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad-Maven Banner Ad 3 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-[100px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Ad-Maven Banner Ad (320x100)</span>
          </div>
        </div>
      </div>

      {/* Ad-Maven Banner Ad 4 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-pink-500 to-red-500 h-[50px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Ad-Maven Banner Ad (320x50)</span>
          </div>
        </div>
      </div>

      {/* ExoClick Real Video Ad - Mobile Optimized */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-white/5 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
            {/* Mobile-specific ad container */}
            <div className="w-full">
              <script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script> 
              <ins className="eas6a97888e31" data-zoneid="5715762" style={{display: 'block', width: '100%', height: '300px'}}></ins> 
              <script dangerouslySetInnerHTML={{__html: '(AdProvider = window.AdProvider || []).push({"serve": {}});'}}></script>
            </div>
            
            {/* Fallback for mobile if ad doesn't load */}
            <div className="text-center text-gray-400 text-sm mt-2">
              <p>Loading video advertisement...</p>
              <p className="text-xs">If ad doesn't appear, please refresh the page</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad-Maven Video Ad Placeholder */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-[250px] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">▶</span>
              </div>
              <span className="text-white font-semibold">Ad-Maven Video Ad</span>
              <p className="text-gray-300 text-sm">(Pre-roll/Mid-roll optimized)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad-Maven Banner Ad 5 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-[100px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Ad-Maven Banner Ad (320x100)</span>
          </div>
        </div>
      </div>

      {/* Ad-Maven Banner Ad 6 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-[50px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Ad-Maven Banner Ad (320x50)</span>
          </div>
        </div>
      </div>

      {/* Ad-Maven Banner Ad 7 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-[100px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Ad-Maven Banner Ad (320x100)</span>
          </div>
        </div>
      </div>

      {/* Ad-Maven Banner Ad 8 */}
      <div className="my-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
          <div className="bg-gradient-to-r from-sky-500 to-blue-500 h-[50px] rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold">Ad-Maven Banner Ad (320x50)</span>
          </div>
        </div>
      </div>

      {/* Simple Button System */}
      
      {/* Top Button - Always visible, changes behavior */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={handleFirstButton}
          disabled={firstTimerActive}
          className={`px-8 py-4 rounded-xl font-bold text-xl shadow-lg transition-all duration-300 ${
            firstTimerActive 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
          }`}
        >
          {firstTimerActive ? `Wait ${firstTimer} seconds...` : 
           firstButtonClicked && !firstTimerActive ? 'Scroll to bottom' : 'Start'}
        </button>
      </div>

      {/* Bottom Button - Appears after scrolling to bottom */}
      {showSecondButton && (
        <div className="my-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <button
              onClick={handleSecondButton}
              disabled={secondTimerActive}
              className={`w-full px-8 py-6 rounded-xl font-bold text-2xl shadow-lg transition-all duration-300 ${
                secondTimerActive 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105'
              }`}
            >
              {secondTimerActive ? `Wait ${secondTimer} seconds...` : 
               secondButtonClicked && !secondTimerActive ? 'Click to redirect' : 'Download'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
