import AdPage from '@/components/ad-page';
import { Suspense } from 'react';

function AdPageContent() {
    return <AdPage />;
}

export default function Page() {
    return (
        <>
            {/* Ad Scripts Section - Add your ad codes here */}
            <div 
                dangerouslySetInnerHTML={{
                    __html: `
                        <script src="https://fpyf8.com/88/tag.min.js" data-zone="165665" async data-cfasync="false"></script>
                    `
                }}
            />
            
            <Suspense fallback={<div>Loading...</div>}>
                <AdPageContent />
            </Suspense>
        </>
    )
}
