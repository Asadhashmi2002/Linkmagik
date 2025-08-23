'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MonetagAd from './monetag-ad';

export default function AdPage() {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get('destination');
    const [countdown, setCountdown] = useState(10);

    // Multiple ad codes for maximum revenue
    const popunderAdCode = `
        <script>(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9760082,document.createElement('script'))</script>
    `;

    const bannerAdCode = `
        // Replace with your Monetag Banner ad code
        // <script>...</script>
    `;

    const pushNotificationAdCode = `
        // Replace with your Monetag Push Notification ad code
        // <script>...</script>
    `;

    useEffect(() => {
        if (!destinationUrl) return;

        if (countdown <= 0) {
            try {
                window.location.href = destinationUrl;
            } catch (e) {
                console.error("Redirection failed", e);
            }
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, destinationUrl]);

    if (!destinationUrl) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
                <h1 className="text-2xl font-bold text-red-600">Redirection Error</h1>
                <p className="mt-2 text-lg text-gray-700">The destination URL is missing.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Banner */}
            <div className="w-full bg-white border-b border-gray-300 p-2">
                <MonetagAd adCode={bannerAdCode} className="h-16 flex items-center justify-center" />
                {!bannerAdCode.includes('<script>') && (
                    <div className="h-16 bg-gray-200 flex items-center justify-center text-gray-500">Top Banner Ad</div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
                {/* Left Sidebar */}
                <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-32 h-64 bg-white border border-gray-300">
                    <MonetagAd adCode={bannerAdCode} className="h-full flex items-center justify-center" />
                    {!bannerAdCode.includes('<script>') && (
                        <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">Left Sidebar Ad</div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-32 h-64 bg-white border border-gray-300">
                    <MonetagAd adCode={bannerAdCode} className="h-full flex items-center justify-center" />
                    {!bannerAdCode.includes('<script>') && (
                        <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">Right Sidebar Ad</div>
                    )}
                </div>

                {/* Center Main Ad */}
                <div className="w-full max-w-4xl mb-8 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                    <MonetagAd adCode={bannerAdCode} className="min-h-48 flex items-center justify-center" />
                    {!bannerAdCode.includes('<script>') && (
                        <div className="min-h-48 bg-gray-200 flex items-center justify-center text-gray-500">Main Ad</div>
                    )}
                </div>

                {/* Bottom Banner */}
                <div className="w-full max-w-4xl mb-8 p-2 bg-white border border-gray-300 rounded">
                    <MonetagAd adCode={bannerAdCode} className="h-20 flex items-center justify-center" />
                    {!bannerAdCode.includes('<script>') && (
                        <div className="h-20 bg-gray-200 flex items-center justify-center text-gray-500">Bottom Banner Ad</div>
                    )}
                </div>
                
                <p className="text-xl text-gray-800 z-10 relative">
                    You will be redirected in <span className="font-bold text-primary">{countdown}</span> seconds...
                </p>
            </div>

            {/* Hidden Multiple Ads */}
            <div style={{ display: 'none' }}>
                <MonetagAd adCode={popunderAdCode} />
                <MonetagAd adCode={popunderAdCode} />
                <MonetagAd adCode={pushNotificationAdCode} />
                <MonetagAd adCode={pushNotificationAdCode} />
            </div>
        </div>
    );
}
