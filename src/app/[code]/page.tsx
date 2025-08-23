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

  const link = await getLinkByCode(code);

  if (link) {
    // Redirect to the first interstitial ad page, passing the final destination as a query parameter.
    const destination = encodeURIComponent(link.longUrl);
    redirect(`/ad?destination=${destination}`);
  } else {
    notFound();
  }
}
