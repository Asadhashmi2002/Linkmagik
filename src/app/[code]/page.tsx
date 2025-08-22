import { getLinkByCode } from '@/lib/db';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import AdPage from '@/components/ad-page';

type Props = {
  params: {
    code: string;
  };
};

export default async function RedirectPage({ params }: Props) {
  const { code } = params;
  
  if (code === 'ad') {
    // This is a special case to prevent a redirect loop for our ad page.
    // The ad page will be rendered by the AdPage component.
    return notFound();
  }

  const link = await getLinkByCode(code);

  if (link) {
    // Redirect to the interstitial ad page, passing the final destination as a query parameter.
    const destination = encodeURIComponent(link.longUrl);
    redirect(`/ad?destination=${destination}`);
  } else {
    notFound();
  }
}
