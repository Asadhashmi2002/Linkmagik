'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdPage() {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get('destination');
    const [countdown, setCountdown] = useState(20);

    useEffect(() => {
        if (!destinationUrl) return;

        if (countdown <= 0) {
            try {
                // Redirect to second ad page instead of destination
                const secondAdUrl = `/ad-2?destination=${encodeURIComponent(destinationUrl)}`;
                window.location.href = secondAdUrl;
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
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
                <p className="text-xl text-gray-800 z-10 relative">
                    Please wait... <span className="font-bold text-primary">{countdown}</span> seconds...
                </p>
            </div>
        </div>
    );
}
