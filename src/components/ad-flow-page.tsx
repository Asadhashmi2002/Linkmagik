'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type AdFlowPageProps = {
    pageNum: number;
    title: string;
    adText: string;
    redirectUrl?: string; // URL for the next step, if not the final redirect
    isFinalRedirect?: boolean;
}

export default function AdFlowPage({ pageNum, title, adText, redirectUrl, isFinalRedirect = false }: AdFlowPageProps) {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get('destination');
    const [countdown, setCountdown] = useState(10);

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
                <p className="mt-2 text-lg text-gray-700">
                    The destination URL is missing.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            <div className="w-full max-w-3xl mb-8 p-4 bg-gray-200 border border-gray-300 rounded-lg shadow-md">
                 {/* This is a placeholder for your ad. */}
                <div className="bg-gray-300 min-h-24 flex items-center justify-center text-gray-500 p-4">
                    {adText}
                </div>
            </div>
            <p className="text-xl text-gray-800">
                { pageNum === 1 ? 'Please wait' : 'You will be redirected in' } <span className="font-bold text-primary">{countdown}</span> seconds...
            </p>
        </div>
    );
}
