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
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [progressStarted, setProgressStarted] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [showEngagementPrompt, setShowEngagementPrompt] = useState(false);
  const [engagementStep, setEngagementStep] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showTimeProgress, setShowTimeProgress] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [showMotivationalMessage, setShowMotivationalMessage] = useState(false);
  const [funFact, setFunFact] = useState('');
  const [funFactIndex, setFunFactIndex] = useState(0);

    useEffect(() => {
    // Start time tracking immediately
    const startTime = Date.now();
    
    // Time tracking interval
    const timeInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsed);
      
      // Show time progress after 10 seconds
      if (elapsed >= 10) {
        setShowTimeProgress(true);
      }
      
             // Show first button immediately (no scroll requirement)
       if (!showFirstButton) {
         setShowFirstButton(true);
       }
       
       // Show second button after first timer completes
       if (firstButtonClicked && !firstTimerActive && !showSecondButton) {
         setShowSecondButton(true);
       }
    }, 1000);

    // Show scroll button after 5 seconds
    const scrollTimer = setTimeout(() => {
      setShowScrollButton(true);
    }, 5000);

    // Show engagement prompt after 15 seconds
    const engagementTimer = setTimeout(() => {
      setShowEngagementPrompt(true);
    }, 15000);

    // Show motivational message after 30 seconds
    const motivationalTimer = setTimeout(() => {
      setShowMotivationalMessage(true);
    }, 30000);

           // Show fun facts every 20 seconds
       const funFactTimer = setInterval(() => {
         const facts = [
           "💡 Did you know? Mobile users spend 70% more time on mobile-optimized sites",
           "🚀 Pro tip: URL shortening can increase click-through rates by up to 34%",
           "📱 Mobile-first design improves conversion rates by 64%",
           "🎯 Native ads perform 8x better than traditional banner ads",
           "⚡ Fast-loading pages have 70% higher conversion rates",
           "💰 High-engagement users generate 3x more ad revenue",
           "📊 Scroll depth directly impacts ad viewability rates",
           "🎯 Interactive ads have 47% higher engagement rates"
         ];
         setFunFact(facts[funFactIndex % facts.length]);
         setFunFactIndex(prev => prev + 1);
       }, 20000);

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
      clearInterval(funFactTimer);
      clearTimeout(scrollTimer);
      clearTimeout(engagementTimer);
      clearTimeout(motivationalTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDepth, showFirstButton, funFactIndex]);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 3000);

    // Track reading progress
    const readingInterval = setInterval(() => {
      setReadingProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 2000); // Increase reading progress every 2 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(readingInterval);
    };
  }, []);

  // First timer effect (15 seconds)
  useEffect(() => {
    if (firstTimerActive && firstTimer > 0) {
      const timer = setTimeout(() => {
        setFirstTimer(prev => prev - 1);
      }, 1000);

      if (firstTimer === 0) {
        setFirstTimerActive(false);
        setShowSecondButton(true);
      }

      return () => clearTimeout(timer);
    }
  }, [firstTimer, firstTimerActive]);

     // Second timer effect (20 seconds)
   useEffect(() => {
     if (secondTimerActive && secondTimer > 0) {
       const timer = setTimeout(() => {
         setSecondTimer(prev => prev - 1);
       }, 1000);

       if (secondTimer === 0) {
         setSecondTimerActive(false);
       }

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
       const destinationUrl = localStorage.getItem('destinationUrl') || 'https://google.com';
       window.location.href = destinationUrl;
     }
   };

  



  const handleScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleEngagement = () => {
    setEngagementStep(prev => prev + 1);
    if (engagementStep >= 2) {
      setShowEngagementPrompt(false);
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
                 {showTimeProgress && (
                   <div className="text-yellow-400">
                     Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                   </div>
                 )}
                 {readingProgress > 0 && (
                   <div className="text-green-400">Reading: {readingProgress}%</div>
                 )}
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
        
        {/* Time Progress Bar */}
        {showTimeProgress && (
          <div className="w-full bg-gray-700 h-2">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 transition-all duration-300"
              style={{ width: `${Math.min((timeSpent / 60) * 100, 100)}%` }}
            ></div>
          </div>
        )}
        
        {/* Reading Progress Bar */}
        {readingProgress > 0 && (
          <div className="w-full bg-gray-700 h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        )}
      </div>

             {/* Pure Adsterra Ads - No Content */}
       
       {/* Adsterra Banner Ad 1 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-[100px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold">Adsterra Banner Ad (320x100)</span>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Interstitial Ad */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-green-500 to-blue-500 h-[400px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold text-center">
                 Adsterra Interstitial Ad<br/>
                 (Full-screen mobile optimized)
               </span>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Native Ad 1 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Sponsored Content</div>
             <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg">
               <h3 className="text-xl font-semibold mb-2">Boost Your Business</h3>
               <p className="text-gray-200 mb-3">Discover proven strategies to grow your online presence</p>
               <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium">
                 Learn More
               </button>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Banner Ad 2 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-orange-500 to-red-500 h-[50px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold">Adsterra Banner Ad (320x50)</span>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Push Notification Ad */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg">
               <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 bg-white rounded-full"></div>
                 <div className="flex-1">
                   <h4 className="font-semibold">Get Notifications</h4>
                   <p className="text-sm text-gray-200">Stay updated with latest tips</p>
                 </div>
                 <button className="bg-white text-orange-600 px-3 py-1 rounded text-sm font-medium">
                   Allow
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Banner Ad 3 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-[100px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold">Adsterra Banner Ad (320x100)</span>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Native Ad 2 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Sponsored Content</div>
             <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-lg">
               <h3 className="text-xl font-semibold mb-2">Mobile Success Guide</h3>
               <p className="text-gray-200 mb-3">Learn how to optimize your business for mobile users</p>
               <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium">
                 Get Started
               </button>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Banner Ad 4 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-pink-500 to-red-500 h-[50px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold">Adsterra Banner Ad (320x50)</span>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Video Ad Placeholder */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-gray-700 to-gray-800 h-[250px] rounded-lg flex items-center justify-center">
               <div className="text-center">
                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                   <span className="text-white text-2xl">▶</span>
                 </div>
                 <span className="text-white font-semibold">Adsterra Video Ad</span>
                 <p className="text-gray-300 text-sm">(Pre-roll/Mid-roll optimized)</p>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Banner Ad 5 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-[100px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold">Adsterra Banner Ad (320x100)</span>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Rich Media Ad */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-lg">
               <div className="text-center">
                 <h3 className="text-xl font-semibold mb-2">Interactive Experience</h3>
                 <p className="text-gray-200 mb-4">Engage with our interactive mobile ad</p>
                 <div className="flex space-x-3 justify-center">
                   <button className="bg-white text-cyan-600 px-4 py-2 rounded-lg font-medium">
                     Tap Here
                   </button>
                   <button className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium">
                     Swipe
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Banner Ad 6 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-[50px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold">Adsterra Banner Ad (320x50)</span>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Native Ad 3 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Sponsored Content</div>
             <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 rounded-lg">
               <h3 className="text-xl font-semibold mb-2">Email Success Blueprint</h3>
               <p className="text-gray-200 mb-3">Master the art of email marketing with proven strategies</p>
               <button className="bg-white text-rose-600 px-4 py-2 rounded-lg font-medium">
                 Download Guide
               </button>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Banner Ad 7 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-[100px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold">Adsterra Banner Ad (320x100)</span>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Push Notification Ad 2 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-lime-500 to-green-500 p-4 rounded-lg">
               <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 bg-white rounded-full"></div>
                 <div className="flex-1">
                   <h4 className="font-semibold">Conversion Tips</h4>
                   <p className="text-sm text-gray-200">Get daily optimization tips</p>
                 </div>
                 <button className="bg-white text-lime-600 px-3 py-1 rounded text-sm font-medium">
                   Subscribe
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Adsterra Banner Ad 8 */}
       <div className="my-8 px-4">
         <div className="container mx-auto max-w-4xl">
           <div className="bg-white/10 rounded-lg border border-white/20 p-4">
             <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
             <div className="bg-gradient-to-r from-sky-500 to-blue-500 h-[50px] rounded-lg flex items-center justify-center">
               <span className="text-white font-semibold">Adsterra Banner Ad (320x50)</span>
             </div>
           </div>
         </div>
       </div>

             {/* Engagement Prompt */}
       {showEngagementPrompt && (
         <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-sm">
           <h3 className="font-semibold mb-2">Stay Engaged!</h3>
           <p className="text-sm text-gray-300 mb-3">
             {engagementStep === 0 && "Scroll down to view more advertisements"}
             {engagementStep === 1 && "Keep scrolling to unlock the next step"}
             {engagementStep === 2 && "Almost there! Complete the engagement"}
           </p>
           <button
             onClick={handleEngagement}
             className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
           >
             Got it
           </button>
         </div>
       )}

             {/* Motivational Message */}
       {showMotivationalMessage && (
         <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg max-w-md text-center">
           <div className="flex items-center space-x-2 justify-center">
             <span className="text-xl">🚀</span>
             <div>
               <h3 className="font-semibold">Almost There!</h3>
               <p className="text-sm">Keep scrolling to unlock the next step</p>
             </div>
           </div>
         </div>
       )}

      {/* Fun Fact Display */}
      {funFact && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg max-w-lg text-center animate-pulse">
          <div className="flex items-center space-x-2 justify-center">
            <span className="text-lg">💡</span>
            <p className="text-sm font-medium">{funFact}</p>
          </div>
        </div>
      )}

      

             {/* Encouragement Message for Low Engagement */}
       {timeSpent >= 20 && scrollDepth < 20 && (
         <div className="fixed top-40 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg max-w-md text-center animate-pulse">
           <div className="flex items-center space-x-2 justify-center">
             <span className="text-xl">📱</span>
             <div>
               <h3 className="font-semibold">Keep Scrolling!</h3>
               <p className="text-sm">Scroll down to view more advertisements</p>
             </div>
           </div>
         </div>
       )}

      {/* Scroll Button */}
      {showScrollButton && (
        <button
          onClick={handleScroll}
          className="fixed bottom-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          
                     {/* Tooltip */}
           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
             Scroll to view more ads
             <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
           </div>
        </button>
      )}

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
