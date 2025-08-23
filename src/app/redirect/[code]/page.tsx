import { getLinkByCode } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: { code: string } }) {
  const { code } = await params;

  try {
    const link = await getLinkByCode(code);

    if (link) {
      // Use Next.js redirect for server-side redirects
      const destination = encodeURIComponent(link.longUrl);
      const redirectUrl = `/ad?destination=${destination}`;
      redirect(redirectUrl);
    } else {
      // If link not found, show error page
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold">Link Not Found</h1>
          <p>Code: {code}</p>
          <p>This short link does not exist.</p>
        </div>
      );
    }
  } catch (error) {
    console.error(`Error processing redirect for code ${code}:`, error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>An error occurred while processing your request.</p>
      </div>
    );
  }
}
