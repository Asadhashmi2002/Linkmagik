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

  try {
    console.log(`Looking up link in database for code: ${code}`);
    const link = await getLinkByCode(code);

    if (link) {
      console.log(`Found link:`, link);
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
