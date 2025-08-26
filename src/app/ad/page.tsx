import AdPage from '@/components/ad-page';
import { Suspense } from 'react';

function AdPageContent() {
    return <AdPage />;
}

export default function Page() {
    return (
        <>
            {/* Google AdSense Banner Ad - Add after site verification */}
            <div className="bg-gray-100 p-4 text-center text-gray-600">
                <p>Ad Space - Google AdSense will be added after site verification</p>
            </div>
            
            <Suspense fallback={<div>Loading...</div>}>
                <AdPageContent />
            </Suspense>
        </>
    )
}
