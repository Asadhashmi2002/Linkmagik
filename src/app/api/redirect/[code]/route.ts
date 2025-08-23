import { getLinkByCode } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = await params;

  console.log(`=== API REDIRECT DEBUG ===`);
  console.log(`Processing redirect for code: ${code}`);

  try {
    console.log(`Looking up link in database for code: ${code}`);
    const link = await getLinkByCode(code);

    if (link) {
      console.log(`Found link:`, link);
      const destination = encodeURIComponent(link.longUrl);
      const redirectUrl = `/ad?destination=${destination}`;
      console.log(`Redirecting to: ${redirectUrl}`);
      
      // Return a redirect response
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    } else {
      console.log(`Link not found for code: ${code}`);
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(`Error processing redirect for code ${code}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
