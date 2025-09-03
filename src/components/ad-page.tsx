'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdPage() {
  const router = useRouter();
  const [showContinue, setShowContinue] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [progressStarted, setProgressStarted] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [showEngagementPrompt, setShowEngagementPrompt] = useState(false);
  const [engagementStep, setEngagementStep] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [minTimeRequired, setMinTimeRequired] = useState(60); // 60 seconds minimum
  const [showTimeProgress, setShowTimeProgress] = useState(false);
  const [engagementRequired, setEngagementRequired] = useState(true);
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
      
             // Enable continue button only after minimum time + engagement
       if (elapsed >= minTimeRequired && readingProgress >= 30 && scrollDepth >= 50) {
         setShowContinue(true);
       }
    }, 1000);

    // Start progress after 2 seconds
    const progressTimer = setTimeout(() => {
      setProgressStarted(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Don't show continue yet - wait for time + engagement
            return 100;
          }
          return prev + 1; // Slower progress
        });
      }, 200); // Slower progress

      return () => clearInterval(interval);
    }, 2000);

         // No skip button - users must complete full engagement

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
           "⚡ Fast-loading pages have 70% higher conversion rates"
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
       clearTimeout(progressTimer);
       clearTimeout(scrollTimer);
       clearTimeout(engagementTimer);
       clearTimeout(motivationalTimer);
       window.removeEventListener('scroll', handleScroll);
     };
  }, [minTimeRequired, readingProgress]);

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

  const handleContinue = () => {
    // Redirect to destination URL
    const destinationUrl = localStorage.getItem('destinationUrl') || 'https://google.com';
    window.location.href = destinationUrl;
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
                {progressStarted && (
                  <div>Progress: {progress}%</div>
                )}
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
                 {timeSpent >= minTimeRequired && readingProgress >= 30 && scrollDepth >= 50 && (
                   <div className="text-emerald-400 font-bold">🎯 Ready to Continue!</div>
                 )}
              </div>
                             <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-2 rounded-lg text-center">
                 <div>⏱️ Stay engaged for better experience</div>
                 <div className="text-yellow-400 font-medium">Reading valuable content...</div>
                 <div className="mt-1 text-xs">
                   {timeSpent < minTimeRequired ? (
                     <span>⏳ {minTimeRequired - timeSpent}s remaining</span>
                   ) : (
                     <span className="text-green-400">✅ Time requirement met!</span>
                   )}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      {progressStarted && (
        <div className="space-y-2">
          {/* Main Progress Bar */}
          <div className="w-full bg-gray-700 h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Time Progress Bar */}
          {showTimeProgress && (
            <div className="w-full bg-gray-700 h-2">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 transition-all duration-300"
                style={{ width: `${Math.min((timeSpent / minTimeRequired) * 100, 100)}%` }}
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
      )}

      {/* Content Sections with Adsterra Ads */}
      
      {/* Section 1: URL Shortening Guide */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Complete Guide to URL Shortening</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            URL shortening is a technique used to create shorter URLs that redirect to longer ones. 
            This is particularly useful for social media platforms, email marketing, and any situation 
            where you need to share a long URL in a concise format.
          </p>
          
          {/* Adsterra Banner Ad 1 */}
          <div className="my-8 p-4 bg-white/10 rounded-lg border border-white/20">
            <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-[100px] rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Adsterra Banner Ad (320x100)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Benefits of URL Shortening</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Cleaner social media posts</li>
                <li>• Better email deliverability</li>
                <li>• Professional appearance</li>
                <li>• Easy to remember</li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Use Cases</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Social media marketing</li>
                <li>• Email campaigns</li>
                <li>• Print materials</li>
                <li>• QR codes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 2: Digital Marketing Tips */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Digital Marketing Strategies</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Effective digital marketing requires a comprehensive approach that combines various 
            strategies and channels. Understanding your audience and creating valuable content 
            is key to success in today's digital landscape.
          </p>

          {/* Adsterra Native Ad 1 */}
          <div className="my-8 p-4 bg-white/10 rounded-lg border border-white/20">
            <div className="text-center text-gray-400 text-sm mb-2">Sponsored Content</div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Boost Your Business</h3>
              <p className="text-gray-200 mb-3">Discover proven strategies to grow your online presence</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium">
                Learn More
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Content Marketing</h3>
              <p className="text-gray-300">Create valuable, relevant content that attracts and engages your target audience.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Social Media</h3>
              <p className="text-gray-300">Build relationships and increase brand awareness through social platforms.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Email Marketing</h3>
              <p className="text-gray-300">Nurture leads and drive conversions with targeted email campaigns.</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 3: SEO Best Practices */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">SEO Best Practices for 2024</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Search Engine Optimization continues to evolve with algorithm updates and changing 
            user behavior. Staying current with SEO best practices is crucial for maintaining 
            and improving your search rankings.
          </p>

          {/* Adsterra Push Notification Ad */}
          <div className="my-8 p-4 bg-white/10 rounded-lg border border-white/20">
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Technical SEO</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Page speed optimization</li>
                <li>• Mobile-first indexing</li>
                <li>• Core Web Vitals</li>
                <li>• Schema markup</li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Content Quality</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Comprehensive coverage</li>
                <li>• User intent matching</li>
                <li>• Regular updates</li>
                <li>• Multimedia content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 4: Mobile Optimization */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Mobile-First Design Principles</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            With mobile devices accounting for over 60% of web traffic, mobile-first design 
            is no longer optional. Understanding mobile user behavior and optimizing for 
            mobile experiences is crucial for success.
          </p>

          {/* Adsterra Native Ad 2 */}
          <div className="my-8 p-4 bg-white/10 rounded-lg border border-white/20">
            <div className="text-center text-gray-400 text-sm mb-2">Sponsored Content</div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Mobile Success Guide</h3>
              <p className="text-gray-200 mb-3">Learn how to optimize your business for mobile users</p>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium">
                Get Started
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Touch-Friendly Design</h3>
              <p className="text-gray-300">Ensure all interactive elements are properly sized for touch input.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Fast Loading</h3>
              <p className="text-gray-300">Optimize images, minimize HTTP requests, and use efficient coding.</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 5: Analytics & Tracking */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Analytics & Performance Tracking</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Data-driven decision making is essential for business growth. Understanding your 
            analytics and tracking key performance indicators helps you optimize your strategies 
            and improve results.
          </p>

          {/* Adsterra Video Ad Placeholder */}
          <div className="my-8 p-4 bg-white/10 rounded-lg border border-white/20">
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

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Key Metrics</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Conversion rates</li>
                <li>• Traffic sources</li>
                <li>• User engagement</li>
                <li>• Page performance</li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Tools & Platforms</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Google Analytics</li>
                <li>• Search Console</li>
                <li>• Heat mapping</li>
                <li>• A/B testing</li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Optimization</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Regular monitoring</li>
                <li>• Data analysis</li>
                <li>• Strategy adjustment</li>
                <li>• Performance improvement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 6: Social Media Marketing */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Social Media Marketing Mastery</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Social media has become the primary platform for brand building and customer engagement. 
            Understanding platform-specific strategies and creating engaging content is key to 
            social media success.
          </p>

          {/* Adsterra Rich Media Ad */}
          <div className="my-8 p-4 bg-white/10 rounded-lg border border-white/20">
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Platform Strategy</h3>
              <p className="text-gray-300">Each social platform has unique features and audience behavior.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Content Creation</h3>
              <p className="text-gray-300">Create valuable, shareable content that resonates with your audience.</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 7: Email Marketing */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Email Marketing Excellence</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Email marketing remains one of the most effective digital marketing channels with 
            the highest ROI. Building quality email lists and creating compelling campaigns 
            is essential for business growth.
          </p>

          {/* Adsterra Native Ad 3 */}
          <div className="my-8 p-4 bg-white/10 rounded-lg border border-white/20">
            <div className="text-center text-gray-400 text-sm mb-2">Sponsored Content</div>
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Email Success Blueprint</h3>
              <p className="text-gray-200 mb-3">Master the art of email marketing with proven strategies</p>
              <button className="bg-white text-rose-600 px-4 py-2 rounded-lg font-medium">
                Download Guide
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">List Building</h3>
              <p className="text-gray-300">Grow your email list with valuable content and incentives.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Campaign Design</h3>
              <p className="text-gray-300">Create visually appealing and mobile-responsive email templates.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Automation</h3>
              <p className="text-gray-300">Set up automated email sequences for better engagement.</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 8: Conversion Optimization */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Conversion Rate Optimization</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            CRO focuses on improving the percentage of visitors who take desired actions on 
            your website. Understanding user behavior and testing different approaches is 
            crucial for maximizing conversions.
          </p>

          {/* Adsterra Push Notification Ad 2 */}
          <div className="my-8 p-4 bg-white/10 rounded-lg border border-white/20">
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

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">User Experience</h3>
              <p className="text-gray-300">Optimize website usability and navigation for better conversions.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">A/B Testing</h3>
              <p className="text-gray-300">Test different elements to find what works best for your audience.</p>
            </div>
          </div>
        </div>
      </section>

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

      {/* Section 9: Future Trends */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Future of Digital Marketing</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            The digital marketing landscape is constantly evolving with new technologies and 
            changing consumer behavior. Staying ahead of trends and adapting strategies is 
            essential for long-term success.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Emerging Technologies</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Artificial Intelligence</li>
                <li>• Voice Search</li>
                <li>• Augmented Reality</li>
                <li>• Blockchain Marketing</li>
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Consumer Behavior</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Privacy concerns</li>
                <li>• Mobile-first approach</li>
                <li>• Video content preference</li>
                <li>• Personalization demand</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Business Growth */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Scaling Your Business Online</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Growing an online business requires strategic planning, consistent execution, and 
            continuous optimization. Understanding your market and building strong customer 
            relationships is key to sustainable growth.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Market Research</h3>
              <p className="text-gray-300">Understand your target audience and market opportunities.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Customer Acquisition</h3>
              <p className="text-gray-300">Implement effective strategies to attract new customers.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Retention Strategies</h3>
              <p className="text-gray-300">Build loyalty and increase customer lifetime value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Success Stories */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Success Stories & Case Studies</h2>
          <p className="text-lg mb-6 text-gray-300 leading-relaxed">
            Learning from successful businesses and understanding what works in different 
            industries can provide valuable insights for your own growth strategy.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">E-commerce Success</h3>
              <p className="text-gray-300">How online stores optimize for conversions and customer experience.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold mb-3">Service Business Growth</h3>
              <p className="text-gray-300">Strategies for scaling service-based businesses online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Prompt */}
      {showEngagementPrompt && (
        <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-sm">
          <h3 className="font-semibold mb-2">Stay Engaged!</h3>
          <p className="text-sm text-gray-300 mb-3">
            {engagementStep === 0 && "Scroll down to read more valuable content"}
            {engagementStep === 1 && "Learn about the latest digital marketing trends"}
            {engagementStep === 2 && "Discover strategies to grow your business"}
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
              <p className="text-sm">Keep reading to unlock amazing insights</p>
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

      {/* Final Countdown Message */}
      {timeSpent >= minTimeRequired - 10 && timeSpent < minTimeRequired && (
        <div className="fixed top-32 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg shadow-lg max-w-md text-center animate-bounce">
          <div className="flex items-center space-x-2 justify-center">
            <span className="text-xl">🎉</span>
            <div>
              <h3 className="font-semibold">Almost Unlocked!</h3>
              <p className="text-sm">Just a few more seconds...</p>
            </div>
          </div>
        </div>
      )}

      {/* Encouragement Message for Low Engagement */}
      {timeSpent >= 20 && (readingProgress < 20 || scrollDepth < 20) && (
        <div className="fixed top-40 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg max-w-md text-center animate-pulse">
          <div className="flex items-center space-x-2 justify-center">
            <span className="text-xl">📚</span>
            <div>
              <h3 className="font-semibold">Keep Reading!</h3>
              <p className="text-sm">Scroll down to discover more valuable content</p>
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
            Scroll to read more content
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        </button>
      )}

      {/* Continue Button */}
      {showContinue && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          {/* Celebration Message */}
          <div className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg text-center animate-bounce">
            <div className="flex items-center space-x-2 justify-center">
              <span className="text-2xl">🎉</span>
              <div>
                <h3 className="font-bold text-lg">Congratulations!</h3>
                <p className="text-sm">You've unlocked the continue button!</p>
              </div>
              <span className="text-2xl">🎉</span>
            </div>
          </div>
          
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Continue to Destination →
          </button>
        </div>
      )}
    </div>
  );
}
