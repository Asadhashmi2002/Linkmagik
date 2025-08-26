import AdPage from '@/components/ad-page';
import { Suspense } from 'react';

function AdPageContent() {
    return <AdPage />;
}

export default function Page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <AdPageContent />
            </Suspense>
        </>
    )
}
