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
  const link = await getLinkByCode(code);

  if (link) {
    redirect(link.longUrl);
  } else {
    notFound();
  }
}
