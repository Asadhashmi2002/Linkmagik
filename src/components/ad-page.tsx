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
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [progressStarted, setProgressStarted] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [showEngagementPrompt, setShowEngagementPrompt] = useState(false);
    const [engagementStep, setEngagementStep] = useState(0);

    useEffect(() => {
        if (!destinationUrl) return;

        // Staggered timing for indirect waiting
        const timers = [
            setTimeout(() => {
                setSkipEnabled(true);
                setSkipText('Skip & Continue');
            }, 3000),
            
            setTimeout(() => {
                setContentLoaded(true);
            }, 5000),
            
            setTimeout(() => {
                setShowEngagementPrompt(true);
            }, 8000),
            
            setTimeout(() => {
                setShowScrollButton(true);
            }, 12000),
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, [destinationUrl]);

    useEffect(() => {
        if (!progressStarted) return;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setShowContinue(true);
                    return 100;
                }
                return prev + 2;
            });
        }, 200);

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
                {/* Valuable Content Section */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to LinkMagik</h2>
                    
                    <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 mb-6">
                            We're preparing your destination. While you wait, explore our platform and discover how we can help you create, manage, and track your links effectively.
                        </p>

                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose LinkMagik?</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h4 className="text-xl font-semibold text-blue-800 mb-3">🚀 Fast & Reliable</h4>
                                <p className="text-gray-700">Our platform ensures your links are always accessible with 99.9% uptime guarantee and lightning-fast redirects.</p>
                            </div>
                            
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h4 className="text-xl font-semibold text-green-800 mb-3">📊 Analytics & Insights</h4>
                                <p className="text-gray-700">Track clicks, monitor performance, and gain valuable insights about your audience with our comprehensive analytics.</p>
                            </div>
                            
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h4 className="text-xl font-semibold text-purple-800 mb-3">🔒 Secure & Private</h4>
                                <p className="text-gray-700">Your data is protected with enterprise-grade security. We never share your information with third parties.</p>
                            </div>
                            
                            <div className="bg-orange-50 p-6 rounded-lg">
                                <h4 className="text-xl font-semibold text-orange-800 mb-3">💡 Easy to Use</h4>
                                <p className="text-gray-700">Create, customize, and manage your links with our intuitive dashboard. No technical knowledge required.</p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h3>
                        <p className="text-gray-700 mb-4">
                            Creating short links with LinkMagik is simple and straightforward:
                        </p>
                        
                        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                            <li><strong>Paste your long URL</strong> - Simply copy and paste any long URL into our shortener</li>
                            <li><strong>Add a description</strong> - Optionally add a description to help you organize your links</li>
                            <li><strong>Generate your short link</strong> - Click create and get your custom short URL instantly</li>
                            <li><strong>Share and track</strong> - Share your link and monitor its performance in real-time</li>
                        </ol>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <p className="text-yellow-800">
                                <strong>Pro Tip:</strong> Use descriptive text in your URLs to make them more memorable and professional-looking.
                            </p>
                        </div>
                    </div>

                    {/* Content Loading Animation */}
                    {!contentLoaded && (
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    
                    {/* Progress Circle */}
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
                        <p className="text-gray-600 text-center">Scroll down to continue...</p>
                    ) : !showContinue ? (
                        <button 
                            disabled
                            className="bg-gray-300 text-gray-500 px-8 py-3 rounded-lg font-medium cursor-not-allowed mx-auto block"
                        >
                            Preparing...
                        </button>
                    ) : (
                        <button 
                            onClick={handleContinue}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 mx-auto block"
                        >
                            Continue to Destination
                        </button>
                    )}
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

                {/* Strategic Ad Placement - Only 2 ads for compliance */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-60 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">Responsive Display Ad (300x250)</p>
                    </div>
                    <p className="text-sm text-gray-500">Sponsored Content</p>
                </div>

                {/* More Valuable Content */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Link Management Best Practices</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">📈 Optimize Your Links</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Use descriptive custom URLs when possible</li>
                                <li>• Group related links with tags</li>
                                <li>• Monitor click-through rates regularly</li>
                                <li>• Update links that aren't performing well</li>
                                <li>• Test your links across different devices</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">🎯 Marketing Tips</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Share links on social media platforms</li>
                                <li>• Include links in email campaigns</li>
                                <li>• Use QR codes for offline marketing</li>
                                <li>• Track which platforms drive the most clicks</li>
                                <li>• A/B test different link descriptions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Second Strategic Ad */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-90 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">In-Article Ad (728x90)</p>
                    </div>
                    <p className="text-sm text-gray-500">Recommended for You</p>
                </div>

                {/* Final Content Section */}
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Continue?</h3>
                    <p className="text-lg text-gray-600 mb-6">
                        Thank you for exploring LinkMagik. We hope you found our platform helpful for your link management needs.
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

            {/* Footer with Subtle Skip Button */}
            <div className="bg-gray-50 border-t mt-12">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            © 2024 LinkMagik. All rights reserved.
                        </div>
                        <div className="text-right">
                            {skipEnabled && (
                                <button 
                                    onClick={handleSkip}
                                    className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors duration-300"
                                >
                                    {skipText}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
