'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MonetagAd from './monetag-ad';

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
    const [countdown, setCountdown] = useState(10);

    // Quick Monetag Ad Code
    const quickAdCode = `
        <script>(s=>{s.dataset.zone='9761216',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>
    `;

    // Popunder Ad Code
    const popunderAdCode = `
        <script>(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9760082,document.createElement('script'))</script>
    `;

    useEffect(() => {
        if (!destinationUrl) return;

        const timer = setTimeout(() => {
            if (countdown <= 1) {
                try {
                    if (isFinalRedirect) {
                        window.location.href = destinationUrl;
                    } else if (redirectUrl) {
                        const nextUrl = `${redirectUrl}?destination=${encodeURIComponent(destinationUrl)}`;
                        window.location.href = nextUrl;
                    }
                } catch (e) {
                    console.error("Redirection failed", e);
                }
            } else {
                 setCountdown(countdown - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, destinationUrl, isFinalRedirect, redirectUrl]);

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
        <div className="min-h-screen bg-gray-100">
            {/* QUICK MONETAG AD - High Performance */}
            <MonetagAd adCode={quickAdCode} />

            {/* Top Banner - Ready for your ads */}
            <div className="w-full bg-white border-b border-gray-300 p-2">
                <div className="h-16 bg-gray-200 flex items-center justify-center text-gray-500">Top Banner Ad - Add your ad file</div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
                {/* Left Sidebar - Ready for your ads */}
                <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-32 h-64 bg-white border border-gray-300">
                    <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">Left Ad Slot</div>
                </div>

                {/* Right Sidebar - Ready for your ads */}
                <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-32 h-64 bg-white border border-gray-300">
                    <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">Right Ad Slot</div>
                </div>

                {/* Center Main Ad - Popunder */}
                <div className="w-full max-w-4xl mb-8 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                    <MonetagAd adCode={popunderAdCode} className="min-h-48 flex items-center justify-center" />
                    <div className="min-h-48 bg-gray-200 flex items-center justify-center text-gray-500">{adText}</div>
                </div>

                {/* Bottom Banner - Ready for your ads */}
                <div className="w-full max-w-4xl mb-8 p-2 bg-white border border-gray-300 rounded">
                    <div className="h-20 bg-gray-200 flex items-center justify-center text-gray-500">Bottom Ad Slot</div>
                </div>
                
                <p className="text-xl text-gray-800 z-10 relative">
                    { pageNum === 1 ? 'Please wait' : 'You will be redirected in' } <span className="font-bold text-primary">{countdown}</span> seconds...
                </p>
            </div>

            {/* Hidden Multiple High-Earning Ads */}
            <div style={{ display: 'none' }}>
                {/* Multiple Quick ads for maximum revenue */}
                <MonetagAd adCode={quickAdCode} />
                <MonetagAd adCode={quickAdCode} />
                
                {/* Multiple Popunder ads */}
                <MonetagAd adCode={popunderAdCode} />
                <MonetagAd adCode={popunderAdCode} />
            </div>
        </div>
    );
}
