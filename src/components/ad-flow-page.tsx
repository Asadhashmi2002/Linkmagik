'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type AdFlowPageProps = {
    pageNum: number;
    title: string;
    adText: string;
    redirectUrl?: string;
    isFinalRedirect?: boolean;
}

export default function AdFlowPage({ pageNum, title, adText, redirectUrl, isFinalRedirect = false }: AdFlowPageProps) {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get('destination');
    const [showContinue, setShowContinue] = useState(false);
    const [progress, setProgress] = useState(50); // Start from 50% (from first page)

    useEffect(() => {
        if (!destinationUrl) return;

        // Start progress animation from 50% to 100%
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setShowContinue(true);
                    return 100;
                }
                return prev + 1;
            });
        }, 300); // 15 seconds total (50% to 100% progress)

        return () => clearInterval(progressInterval);
    }, [destinationUrl]);

    const handleContinue = () => {
        if (destinationUrl && isFinalRedirect) {
                        window.location.href = destinationUrl;
        }
    };

    useEffect(() => {
        document.title = title;
    }, [title])

    if (!destinationUrl) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
                <h1 className="text-2xl font-bold text-red-600">Redirection Error</h1>
                <p className="mt-2 text-lg text-gray-700">The destination URL is missing.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-800">Step 2 of 2</h1>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{progress}% Complete</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Banner Ad 1 - Top */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
                    <div className="w-full h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-gray-600 font-medium">Banner Ad Space 1</p>
                    </div>
                    <p className="text-sm text-gray-500">Google AdSense Banner Ad</p>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Almost There!</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Final step to reach your destination. Thank you for your patience.
                        </p>
                        
                        {/* Progress Circle */}
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
                                        className="text-green-500 transition-all duration-300"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-bold text-gray-800">{progress}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        {!showContinue ? (
                            <button 
                                disabled
                                className="bg-gray-300 text-gray-500 px-8 py-3 rounded-lg font-medium cursor-not-allowed"
                            >
                                Please Wait...
                            </button>
                        ) : (
                            <button 
                                onClick={handleContinue}
                                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                            >
                                Continue to Destination
                            </button>
                        )}
                    </div>
                </div>

                {/* Multiple Banner Ads - Scrollable */}
                <div className="space-y-6">
                    {/* Banner Ad 2 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 2</p>
                        </div>
                        <p className="text-xs text-gray-500">Sponsored Content</p>
                    </div>

                    {/* Banner Ad 3 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 3</p>
                        </div>
                        <p className="text-xs text-gray-500">Recommended for You</p>
                    </div>

                    {/* Banner Ad 4 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 4</p>
                        </div>
                        <p className="text-xs text-gray-500">Special Offer</p>
                    </div>

                    {/* Banner Ad 5 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 5</p>
                        </div>
                        <p className="text-xs text-gray-500">Trending Now</p>
                    </div>

                    {/* Banner Ad 6 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 6</p>
                        </div>
                        <p className="text-xs text-gray-500">Limited Time</p>
                    </div>

                    {/* Banner Ad 7 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 7</p>
                        </div>
                        <p className="text-xs text-gray-500">Hot Deal</p>
                    </div>

                    {/* Banner Ad 8 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 8</p>
                        </div>
                        <p className="text-xs text-gray-500">New Arrival</p>
                    </div>

                    {/* Banner Ad 9 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 9</p>
                        </div>
                        <p className="text-xs text-gray-500">Exclusive Deal</p>
                    </div>

                    {/* Banner Ad 10 */}
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-r from-violet-100 to-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <p className="text-gray-600 font-medium">Banner Ad 10</p>
                        </div>
                        <p className="text-xs text-gray-500">Best Seller</p>
                    </div>
                </div>
            </div>
        </div>
    );
}