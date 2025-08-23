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

  if (code === 'ad' || code === 'ad-2') {
    return notFound();
  }

  try {
    const link = await getLinkByCode(code);

    if (link) {
      const destination = encodeURIComponent(link.longUrl);
      const redirectUrl = `/ad?destination=${destination}`;
      redirect(redirectUrl);
    } else {
      notFound();
    }
  } catch (error) {
    notFound();
  }
}
