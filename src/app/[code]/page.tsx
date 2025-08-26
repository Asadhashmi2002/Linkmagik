import { getLinkByCode } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function ShortCodePage({ 
  params 
}: { 
  params: { code: string } 
}) {
  const { code } = await params;

  console.log(`=== DYNAMIC ROUTE DEBUG ===`);
  console.log(`Processing code: ${code}`);

  try {
    const link = await getLinkByCode(code);
    console.log(`Database result:`, link);

    if (link) {
      const destination = encodeURIComponent(link.longUrl);
      const redirectUrl = `/ad?destination=${destination}`;
      console.log(`Redirecting to: ${redirectUrl}`);
      
      // Redirect to ad page
      redirect(redirectUrl);
    } else {
      console.log(`Link not found, redirecting to dashboard`);
      // If link not found, redirect to dashboard
      redirect('/dashboard');
    }
  } catch (error) {
    console.error(`Error processing redirect for code ${code}:`, error);
    // On error, redirect to dashboard
    redirect('/dashboard');
  }
}
