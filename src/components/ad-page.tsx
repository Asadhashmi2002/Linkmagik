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
                {/* Content Section 1: Introduction */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to LinkMagik</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        We're preparing your destination. While you wait, discover how LinkMagik can revolutionize your link management and boost your online presence.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">🚀 Lightning Fast</h3>
                            <p className="text-gray-700">Create, customize, and track your links in seconds with our advanced platform.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-green-800 mb-3">📊 Advanced Analytics</h3>
                            <p className="text-gray-700">Get detailed insights into your link performance and audience behavior.</p>
                        </div>
                    </div>

                    {/* Content Loading Animation */}
                    {!contentLoaded && (
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                {/* HIGH CPM AD 1: Responsive Display Ad (Highest CPM) */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-90 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">Responsive Display Ad (728x90) - HIGHEST CPM</p>
                    </div>
                    <p className="text-sm text-gray-500">Premium Display Advertising</p>
                </div>

                {/* Content Section 2: Link Management Guide */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Mastering Link Management</h3>
                    
                    <div className="prose max-w-none">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Creating Effective Short Links</h4>
                        <p className="text-gray-700 mb-4">
                            The key to successful link management lies in understanding your audience and optimizing for engagement. Here's how to create links that convert:
                        </p>
                        
                        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
                            <li><strong>Choose descriptive URLs</strong> - Make your links memorable and professional</li>
                            <li><strong>Add relevant descriptions</strong> - Help organize and track your campaigns</li>
                            <li><strong>Monitor performance</strong> - Track clicks, conversions, and engagement</li>
                            <li><strong>Optimize based on data</strong> - Use analytics to improve your strategy</li>
                        </ol>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <p className="text-yellow-800">
                                <strong>Pro Tip:</strong> Use branded short URLs to build trust and recognition with your audience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* HIGH CPM AD 2: In-Article Ad (High CPM) */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-60 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">In-Article Ad (300x250) - HIGH CPM</p>
                    </div>
                    <p className="text-sm text-gray-500">Contextual Advertising</p>
                </div>

                {/* Content Section 3: Marketing Strategies */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Advanced Marketing Strategies</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">📈 Social Media Optimization</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Share links across multiple platforms</li>
                                <li>• Use platform-specific descriptions</li>
                                <li>• Track engagement by platform</li>
                                <li>• Optimize posting times</li>
                                <li>• A/B test different approaches</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">🎯 Email Campaign Integration</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Include short links in newsletters</li>
                                <li>• Track email click-through rates</li>
                                <li>• Segment audiences by behavior</li>
                                <li>• Personalize link descriptions</li>
                                <li>• Monitor conversion rates</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold text-blue-800 mb-3">💡 Advanced Tips</h4>
                        <p className="text-gray-700">
                            Combine multiple strategies for maximum impact. Use analytics to identify your best-performing content and double down on what works.
                        </p>
                    </div>
                </div>

                {/* HIGH CPM AD 3: In-Feed Ad (High CPM) */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-60 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">In-Feed Ad (300x250) - HIGH CPM</p>
                    </div>
                    <p className="text-sm text-gray-500">Native Advertising</p>
                </div>

                {/* Content Section 4: Analytics & Performance */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Analytics & Performance Tracking</h3>
                    
                    <p className="text-lg text-gray-700 mb-6">
                        Understanding your link performance is crucial for optimizing your marketing efforts. Here's how to leverage analytics effectively:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                            <h4 className="text-xl font-semibold text-green-800 mb-3">📊 Click Tracking</h4>
                            <p className="text-gray-700">Monitor real-time click data and identify peak engagement times.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg text-center">
                            <h4 className="text-xl font-semibold text-blue-800 mb-3">🌍 Geographic Data</h4>
                            <p className="text-gray-700">Understand where your audience is located and optimize accordingly.</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg text-center">
                            <h4 className="text-xl font-semibold text-purple-800 mb-3">📱 Device Analytics</h4>
                            <p className="text-gray-700">Track performance across different devices and optimize for mobile.</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">🔍 Key Metrics to Monitor</h4>
                        <ul className="space-y-2 text-gray-700">
                            <li>• <strong>Click-through rate (CTR):</strong> Percentage of people who click your links</li>
                            <li>• <strong>Conversion rate:</strong> How many clicks lead to desired actions</li>
                            <li>• <strong>Engagement time:</strong> How long users stay on destination pages</li>
                            <li>• <strong>Bounce rate:</strong> Percentage of users who leave immediately</li>
                        </ul>
                    </div>
                </div>

                {/* HIGH CPM AD 4: Display Ad (High CPM) */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-90 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">Display Ad (300x600) - HIGH CPM</p>
                    </div>
                    <p className="text-sm text-gray-500">Skyscraper Advertising</p>
                </div>

                {/* Content Section 5: Best Practices */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Industry Best Practices</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">🔒 Security & Privacy</h4>
                            <p className="text-gray-700 mb-4">
                                Protect your links and maintain user trust with these security best practices:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Use HTTPS for all your links</li>
                                <li>• Regularly monitor for suspicious activity</li>
                                <li>• Implement rate limiting to prevent abuse</li>
                                <li>• Keep your platform updated</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">⚡ Performance Optimization</h4>
                            <p className="text-gray-700 mb-4">
                                Ensure your links load quickly and provide the best user experience:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Optimize redirect speeds</li>
                                <li>• Use CDN for global performance</li>
                                <li>• Monitor uptime and reliability</li>
                                <li>• Test across different devices</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* HIGH CPM AD 5: Responsive Ad (High CPM) */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-60 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">Responsive Ad (320x100) - HIGH CPM</p>
                    </div>
                    <p className="text-sm text-gray-500">Mobile Optimized Advertising</p>
                </div>

                {/* Content Section 6: Advanced Techniques */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Advanced Link Optimization Techniques</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">🎨 Custom Branding</h4>
                            <p className="text-gray-700 mb-4">
                                Create branded short URLs that reflect your business identity and build trust with your audience.
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Use your company name in URLs</li>
                                <li>• Create memorable, short codes</li>
                                <li>• Maintain consistency across campaigns</li>
                                <li>• Build brand recognition</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">📱 Mobile Optimization</h4>
                            <p className="text-gray-700 mb-4">
                                Ensure your links work perfectly across all devices and platforms for maximum reach.
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Test on multiple devices</li>
                                <li>• Optimize for mobile browsers</li>
                                <li>• Ensure fast loading times</li>
                                <li>• Monitor mobile performance</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* HIGH CPM AD 6: In-Article Ad (High CPM) */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-60 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">In-Article Ad (300x250) - HIGH CPM</p>
                    </div>
                    <p className="text-sm text-gray-500">Content-Relevant Advertising</p>
                </div>

                {/* Content Section 7: ROI Optimization */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Maximizing Your ROI</h3>
                    
                    <p className="text-lg text-gray-700 mb-6">
                        Learn how to get the most value from your link management efforts and maximize your return on investment.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-emerald-50 p-6 rounded-lg text-center">
                            <h4 className="text-xl font-semibold text-emerald-800 mb-3">💰 Cost Optimization</h4>
                            <p className="text-gray-700">Reduce costs while maintaining high performance and quality.</p>
                        </div>
                        <div className="bg-amber-50 p-6 rounded-lg text-center">
                            <h4 className="text-xl font-semibold text-amber-800 mb-3">📈 Performance Scaling</h4>
                            <p className="text-gray-700">Scale your campaigns efficiently as your business grows.</p>
                        </div>
                        <div className="bg-rose-50 p-6 rounded-lg text-center">
                            <h4 className="text-xl font-semibold text-rose-800 mb-3">🎯 Conversion Focus</h4>
                            <p className="text-gray-700">Focus on actions that drive real business results.</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">🚀 Pro Tips for Success</h4>
                        <ul className="space-y-2 text-gray-700">
                            <li>• <strong>Test everything:</strong> A/B test your links, descriptions, and campaigns</li>
                            <li>• <strong>Monitor trends:</strong> Stay updated with industry best practices</li>
                            <li>• <strong>Optimize continuously:</strong> Always look for ways to improve performance</li>
                            <li>• <strong>Focus on quality:</strong> Quality over quantity always wins</li>
                        </ul>
                    </div>
                </div>

                {/* HIGH CPM AD 7: Display Ad (High CPM) */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-90 bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">Display Ad (300x250) - HIGH CPM</p>
                    </div>
                    <p className="text-sm text-gray-500">Medium Rectangle Advertising</p>
                </div>

                {/* Content Section 8: Future Trends */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Future of Link Management</h3>
                    
                    <p className="text-lg text-gray-700 mb-6">
                        Stay ahead of the curve by understanding emerging trends and technologies in link management.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">🤖 AI-Powered Analytics</h4>
                            <p className="text-gray-700 mb-4">
                                Artificial intelligence is revolutionizing how we analyze and optimize link performance. AI can predict trends, identify opportunities, and automate optimization processes.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">🔗 Smart Link Technology</h4>
                            <p className="text-gray-700 mb-4">
                                Next-generation smart links that adapt to user behavior, device type, and location to provide the most relevant experience.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">📊 Advanced Attribution</h4>
                            <p className="text-gray-700 mb-4">
                                Multi-touch attribution models that provide deeper insights into the customer journey and conversion paths.
                            </p>
                        </div>
                    </div>
                </div>

                {/* HIGH CPM AD 8: In-Feed Ad (High CPM) */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-60 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">In-Feed Ad (300x250) - HIGH CPM</p>
                    </div>
                    <p className="text-sm text-gray-500">Native Feed Advertising</p>
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
