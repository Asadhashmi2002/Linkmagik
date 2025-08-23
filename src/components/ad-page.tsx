'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MonetagAd from './monetag-ad';

export default function AdPage() {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get('destination');
    const [countdown, setCountdown] = useState(10);

    // MULTITAG - All-in-one for highest revenue
    const multitagAdCode = `
        // Replace with your Monetag Multitag code
        // <script>...</script>
    `;

    // ONCLICK (Popunder) - High CPM rates
    const popunderAdCode = `
        <script>(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9760082,document.createElement('script'))</script>
    `;

    // PUSH NOTIFICATIONS - Long-term income
    const pushNotificationAdCode = `
        // Replace with your Monetag Push Notification code
        // <script>...</script>
    `;

    // IN-PAGE PUSH (Banner) - Native-like banners
    const inPagePushAdCode = `
        // Replace with your Monetag In-Page Push code
        // <script>...</script>
    `;

    // INTERSTITIAL - Higher CPM than traditional banners
    const interstitialAdCode = `
        // Replace with your Monetag Interstitial code
        // <script>...</script>
    `;

    // VIGNETTE BANNER - 65% higher CPM rates
    const vignetteBannerAdCode = `
        // Replace with your Monetag Vignette Banner code
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
            {/* MULTITAG - All-in-one for maximum revenue */}
            <MonetagAd adCode={multitagAdCode} />

            {/* Top Banner - In-Page Push */}
            <div className="w-full bg-white border-b border-gray-300 p-2">
                <MonetagAd adCode={inPagePushAdCode} className="h-16 flex items-center justify-center" />
                {!inPagePushAdCode.includes('<script>') && (
                    <div className="h-16 bg-gray-200 flex items-center justify-center text-gray-500">Top Banner Ad</div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
                {/* Left Sidebar - Vignette Banner */}
                <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-32 h-64 bg-white border border-gray-300">
                    <MonetagAd adCode={vignetteBannerAdCode} className="h-full flex items-center justify-center" />
                    {!vignetteBannerAdCode.includes('<script>') && (
                        <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">Left Sidebar Ad</div>
                    )}
                </div>

                {/* Right Sidebar - Vignette Banner */}
                <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-32 h-64 bg-white border border-gray-300">
                    <MonetagAd adCode={vignetteBannerAdCode} className="h-full flex items-center justify-center" />
                    {!vignetteBannerAdCode.includes('<script>') && (
                        <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">Right Sidebar Ad</div>
                    )}
                </div>

                {/* Center Main Ad - Interstitial */}
                <div className="w-full max-w-4xl mb-8 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                    <MonetagAd adCode={interstitialAdCode} className="min-h-48 flex items-center justify-center" />
                    {!interstitialAdCode.includes('<script>') && (
                        <div className="min-h-48 bg-gray-200 flex items-center justify-center text-gray-500">Main Ad</div>
                    )}
                </div>

                {/* Bottom Banner - In-Page Push */}
                <div className="w-full max-w-4xl mb-8 p-2 bg-white border border-gray-300 rounded">
                    <MonetagAd adCode={inPagePushAdCode} className="h-20 flex items-center justify-center" />
                    {!inPagePushAdCode.includes('<script>') && (
                        <div className="h-20 bg-gray-200 flex items-center justify-center text-gray-500">Bottom Banner Ad</div>
                    )}
                </div>
                
                <p className="text-xl text-gray-800 z-10 relative">
                    You will be redirected in <span className="font-bold text-primary">{countdown}</span> seconds...
                </p>
            </div>

            {/* Hidden Multiple High-Earning Ads */}
            <div style={{ display: 'none' }}>
                {/* Multiple Popunder ads for maximum revenue */}
                <MonetagAd adCode={popunderAdCode} />
                <MonetagAd adCode={popunderAdCode} />
                <MonetagAd adCode={popunderAdCode} />
                
                {/* Multiple Push Notification ads */}
                <MonetagAd adCode={pushNotificationAdCode} />
                <MonetagAd adCode={pushNotificationAdCode} />
                <MonetagAd adCode={pushNotificationAdCode} />
                
                {/* Multiple Interstitial ads */}
                <MonetagAd adCode={interstitialAdCode} />
                <MonetagAd adCode={interstitialAdCode} />
                
                {/* Multiple Vignette Banner ads */}
                <MonetagAd adCode={vignetteBannerAdCode} />
                <MonetagAd adCode={vignetteBannerAdCode} />
            </div>
        </div>
    );
}
