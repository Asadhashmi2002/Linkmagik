import AdPage from '@/components/ad-page';
import { Suspense } from 'react';

// Using Suspense to handle client-side nature of URL search parameters
function AdPageContent() {
    return <AdPage />;
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdPageContent />
        </Suspense>
    )
}
