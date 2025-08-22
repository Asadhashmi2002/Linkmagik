'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdPage() {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get('destination');
    const [countdown, setCountdown] = useState(10);

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
            <div className="w-full max-w-3xl mb-8 p-4 bg-gray-200 border border-gray-300 rounded-lg shadow-md">
                 {/* This is a placeholder for your ad.
                     Your ad network's script will likely inject an iframe or other element here.
                     You may need to adjust the styling based on the ad format. */}
                <div className="bg-gray-300 h-24 flex items-center justify-center text-gray-500">
                    Your Ad Here
                </div>
            </div>
            <p className="text-xl text-gray-800">
                You will be redirected in <span className="font-bold text-primary">{countdown}</span> seconds...
            </p>
        </div>
    );
}
