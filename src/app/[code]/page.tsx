import { getLinkByCode } from '@/lib/db';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    code: string;
  };
};

export default async function RedirectPage({ params }: Props) {
  const { code } = params;

  console.log(`Processing redirect for code: ${code}`);

  // Prevent redirect loops for our ad pages
  if (code === 'ad' || code === 'ad-2') {
    console.log(`Preventing redirect loop for ad page: ${code}`);
    return notFound();
  }

  try {
    console.log(`Looking up link in database for code: ${code}`);
    const link = await getLinkByCode(code);

    if (link) {
      console.log(`Found link:`, link);
      // Redirect to the first interstitial ad page, passing the final destination as a query parameter.
      const destination = encodeURIComponent(link.longUrl);
      const redirectUrl = `/ad?destination=${destination}`;
      console.log(`Redirecting to: ${redirectUrl}`);
      redirect(redirectUrl);
    } else {
      console.log(`Link not found for code: ${code}`);
      notFound();
    }
  } catch (error) {
    console.error(`Error processing redirect for code ${code}:`, error);
    notFound();
  }
}
