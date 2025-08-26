import AdFlowPage from '@/components/ad-flow-page';
import { Suspense } from 'react';

// Using Suspense to handle client-side nature of URL search parameters
function AdPageContent() {
    return <AdFlowPage
        pageNum={2}
        title="Please wait... (Step 2 of 2)"
        adText="Your Ad Here (Page 2)"
        isFinalRedirect={true}
    />;
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
