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
    // Temporarily redirect directly to destination for testing
    // TODO: Uncomment the ad flow redirect after testing
    // const destination = encodeURIComponent(link.longUrl);
    // redirect(`/ad?destination=${destination}`);
    
    // Direct redirect for testing
    redirect(link.longUrl);
  } else {
    notFound();
  }
}
