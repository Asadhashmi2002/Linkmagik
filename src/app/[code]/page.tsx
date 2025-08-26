import { getLinkByCode } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function ShortCodePage({ 
  params 
}: { 
  params: { code: string } 
}) {
  const { code } = await params;

  try {
    const link = await getLinkByCode(code);

    if (link) {
      const destination = encodeURIComponent(link.longUrl);
      const redirectUrl = `/ad?destination=${destination}`;
      
      // Redirect to ad page
      redirect(redirectUrl);
    } else {
      // If link not found, redirect to dashboard
      redirect('/dashboard');
    }
  } catch (error) {
    console.error(`Error processing redirect for code ${code}:`, error);
    // On error, redirect to dashboard
    redirect('/dashboard');
  }
}
