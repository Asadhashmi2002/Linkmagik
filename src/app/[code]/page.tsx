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

  // TEMPORARY: Return a simple page to test if route is working
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dynamic Route Test</h1>
      <p>Code: {code}</p>
      <p>This page should work if the dynamic route is properly deployed.</p>
      <p>If you see this, the route is working!</p>
    </div>
  );

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
