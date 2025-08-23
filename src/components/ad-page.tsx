'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MonetagAd from './monetag-ad';

export default function AdPage() {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get('destination');
    const [countdown, setCountdown] = useState(10);

    // Placeholder for Monetag ad codes - replace with your actual ad codes
    const interstitialAdCode = `
        // Replace this with your Monetag Interstitial ad code
        // Example: <script>...</script>
    `;

    const popunderAdCode = `
        <script>(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9760082,document.createElement('script'))</script>
    `;

    useEffect(() => {
        if (!destinationUrl) return;

        if (countdown <= 0) {
            try {
                // Perform the redirection
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
                <p className="mt-2 text-lg text-gray-700">
                    The destination URL is missing.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            {/* Interstitial Ad */}
            <div className="w-full max-w-3xl mb-8 p-4 bg-gray-200 border border-gray-300 rounded-lg shadow-md">
                <MonetagAd 
                    adCode={interstitialAdCode}
                    className="min-h-24 flex items-center justify-center"
                />
                {!interstitialAdCode.includes('<script>') && (
                    <div className="bg-gray-300 h-24 flex items-center justify-center text-gray-500">
                        Interstitial Ad Placeholder
                    </div>
                )}
            </div>
            
            <p className="text-xl text-gray-800">
                You will be redirected in <span className="font-bold text-primary">{countdown}</span> seconds...
            </p>

            {/* Popunder Ad - Hidden but will trigger on page load */}
            <div style={{ display: 'none' }}>
                <MonetagAd adCode={popunderAdCode} />
            </div>
        </div>
    );
}
