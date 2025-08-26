import AdPage from '@/components/ad-page';
import { Suspense } from 'react';

// Using Suspense to handle client-side nature of URL search parameters
function AdPageContent() {
    return <AdPage />;
}

export default function Page() {
    return (
        <>
            {/* Popunder Ad Code */}
            <script src="https://fpyf8.com/88/tag.min.js" data-zone="165665" async data-cfasync="false"></script>
            <Suspense fallback={<div>Loading...</div>}>
                <AdPageContent />
            </Suspense>
        </>
    )
}
