'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdPage() {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get('destination');
    const [showContinue, setShowContinue] = useState(false);
    const [progress, setProgress] = useState(0);
    const [skipEnabled, setSkipEnabled] = useState(false);
    const [skipText, setSkipText] = useState('Preparing...');
    const [showScrollButton, setShowScrollButton] = useState(false); // Start hidden
    const [progressStarted, setProgressStarted] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [showEngagementPrompt, setShowEngagementPrompt] = useState(false);
    const [engagementStep, setEngagementStep] = useState(0);

    useEffect(() => {
        if (!destinationUrl) return;

        // Staggered timing for indirect waiting
        const timers = [
            // 3 seconds: Enable skip button
            setTimeout(() => {
                setSkipEnabled(true);
                setSkipText('Skip & Continue');
            }, 3000),
            
            // 5 seconds: Show content loaded animation
            setTimeout(() => {
                setContentLoaded(true);
            }, 5000),
            
            // 8 seconds: Show engagement prompt
            setTimeout(() => {
                setShowEngagementPrompt(true);
            }, 8000),
            
            // 12 seconds: Show scroll button
            setTimeout(() => {
                setShowScrollButton(true);
            }, 12000),
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [destinationUrl]);

    useEffect(() => {
        if (!progressStarted) return;

        // Start progress animation when user clicks scroll button
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setShowContinue(true);
                    return 100;
                }
                return prev + 2;
            });
        }, 200); // 10 seconds total

        return () => clearInterval(progressInterval);
    }, [progressStarted]);

    const handleContinue = () => {
        if (destinationUrl) {
            window.location.href = destinationUrl;
        }
    };

    const handleSkip = () => {
        if (destinationUrl && skipEnabled) {
            window.location.href = destinationUrl;
        }
    };

    const handleScrollToBottom = () => {
        setShowScrollButton(false);
        setProgressStarted(true);
        setProgress(0);
    };

    const handleEngagementClick = () => {
        setEngagementStep(prev => prev + 1);
        if (engagementStep >= 2) {
            setShowScrollButton(true);
        }
    };

    if (!destinationUrl) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
                <h1 className="text-2xl font-bold text-red-600">Redirection Error</h1>
                <p className="mt-2 text-lg text-gray-700">The destination URL is missing.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-800">Redirecting...</h1>
                    {progressStarted && (
                        <>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{progress}% Complete</p>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Top Skip Button - Initially disabled */}
                <div className="text-center mb-6">
                    <button 
                        onClick={handleSkip}
                        disabled={!skipEnabled}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                            skipEnabled 
                                ? 'bg-gray-500 hover:bg-gray-600 text-white cursor-pointer' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {skipText}
                    </button>
                </div>

                {/* High-Paying Ad 1 - Responsive Display Ad */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-90 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">Responsive Display Ad (728x90)</p>
                    </div>
                    <p className="text-sm text-gray-500">High CPM Display Ad</p>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Wait</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            We're preparing your destination. Scroll down to explore our content.
                        </p>
                        
                        {/* Content Loading Animation */}
                        {!contentLoaded && (
                            <div className="flex justify-center mb-8">
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        
                        {/* Progress Circle - Only show when progress started */}
                        {progressStarted && (
                            <div className="flex justify-center mb-8">
                                <div className="relative w-24 h-24">
                                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            className="text-gray-200"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="transparent"
                                            strokeDasharray={`${2 * Math.PI * 40}`}
                                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                                            className="text-blue-500 transition-all duration-300"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-bold text-gray-800">{progress}%</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Button */}
                        {!progressStarted ? (
                            <p className="text-gray-600">Scroll down to continue...</p>
                        ) : !showContinue ? (
                            <button 
                                disabled
                                className="bg-gray-300 text-gray-500 px-8 py-3 rounded-lg font-medium cursor-not-allowed"
                            >
                                Preparing...
                            </button>
                        ) : (
                            <button 
                                onClick={handleContinue}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                            >
                                Continue to Destination
                            </button>
                        )}
                    </div>
                </div>

                {/* Engagement Prompt */}
                {showEngagementPrompt && !showScrollButton && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6 text-center">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Quick Question</h3>
                        <p className="text-yellow-700 mb-4">
                            {engagementStep === 0 && "Are you finding our content helpful?"}
                            {engagementStep === 1 && "Would you like to see more recommendations?"}
                            {engagementStep === 2 && "Great! You're almost ready to continue."}
                        </p>
                        <button 
                            onClick={handleEngagementClick}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                        >
                            {engagementStep === 0 && "Yes, it's helpful"}
                            {engagementStep === 1 && "Yes, show me more"}
                            {engagementStep === 2 && "Continue"}
                        </button>
                    </div>
                )}

                {/* High-Paying Ad 2 - In-Article Ad */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-60 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">In-Article Ad (300x250)</p>
                    </div>
                    <p className="text-sm text-gray-500">High CPM In-Article Ad</p>
                </div>

                {/* Multiple High-Paying Ads - Scrollable Content */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Recommended Content</h3>
                    
                    {/* High-Paying Ad 3 - In-Feed Ad */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-32 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">In-Feed Ad (300x250)</p>
                        </div>
                        <p className="text-xs text-gray-500">High CPM In-Feed Ad</p>
                    </div>

                    {/* High-Paying Ad 4 - Responsive Ad */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Responsive Ad (320x100)</p>
                        </div>
                        <p className="text-xs text-gray-500">Mobile Optimized Ad</p>
                    </div>

                    {/* High-Paying Ad 5 - Display Ad */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-32 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Display Ad (300x600)</p>
                        </div>
                        <p className="text-xs text-gray-500">Skyscraper Ad</p>
                    </div>

                    {/* High-Paying Ad 6 - In-Article Ad */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-32 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">In-Article Ad (300x250)</p>
                        </div>
                        <p className="text-xs text-gray-500">Content-Relevant Ad</p>
                    </div>

                    {/* High-Paying Ad 7 - Responsive Ad */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-32 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Responsive Ad (468x60)</p>
                        </div>
                        <p className="text-xs text-gray-500">Banner Ad</p>
                    </div>

                    {/* High-Paying Ad 8 - In-Feed Ad */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-32 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">In-Feed Ad (300x250)</p>
                        </div>
                        <p className="text-xs text-gray-500">Native Ad</p>
                    </div>

                    {/* High-Paying Ad 9 - Display Ad */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-32 bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Display Ad (300x250)</p>
                        </div>
                        <p className="text-xs text-gray-500">Medium Rectangle</p>
                    </div>

                    {/* High-Paying Ad 10 - Responsive Ad */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-32 bg-gradient-to-r from-rose-100 to-pink-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Responsive Ad (320x50)</p>
                        </div>
                        <p className="text-xs text-gray-500">Mobile Banner</p>
                    </div>

                    {/* Bottom Card with Scroll Button */}
                    <div className="bg-white rounded-lg shadow-md p-8 text-center mt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Continue?</h3>
                        <p className="text-lg text-gray-600 mb-6">
                            Thank you for exploring our content. Click below to proceed to your destination.
                        </p>
                        
                        {showScrollButton ? (
                            <button 
                                onClick={handleScrollToBottom}
                                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                            >
                                Start Progress & Continue
                            </button>
                        ) : progressStarted && !showContinue ? (
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">Preparing your destination...</p>
                            </div>
                        ) : showContinue ? (
                            <button 
                                onClick={handleContinue}
                                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                            >
                                Continue to Destination
                            </button>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-500">Loading content...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
