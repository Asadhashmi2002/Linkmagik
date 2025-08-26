import { getLinkByCode } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function ShortCodePage({ 
  params 
}: { 
  params: { code: string } 
}) {
  const { code } = await params;

  const link = await getLinkByCode(code);

  if (link) {
    const destination = encodeURIComponent(link.longUrl);
    const redirectUrl = `/ad?destination=${destination}`;
    
    // Redirect to ad page
    redirect(redirectUrl);
  }

  // If we reach here, link not found
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Link Not Found</h1>
        <p className="text-gray-300 mb-6">The short link <code className="bg-white/10 px-2 py-1 rounded">{code}</code> does not exist.</p>
        <a 
          href="/dashboard" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
