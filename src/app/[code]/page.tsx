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

  // Prevent redirect loops for our ad pages
  if (code === 'ad' || code === 'ad-2') {
    return notFound();
  }

  try {
    const link = await getLinkByCode(code);

    if (link) {
      // Redirect to the first interstitial ad page, passing the final destination as a query parameter.
      const destination = encodeURIComponent(link.longUrl);
      console.log(`Redirecting ${code} to /ad?destination=${destination}`);
      redirect(`/ad?destination=${destination}`);
    } else {
      console.log(`Link not found for code: ${code}`);
      notFound();
    }
  } catch (error) {
    console.error(`Error processing redirect for code ${code}:`, error);
    notFound();
  }
}
