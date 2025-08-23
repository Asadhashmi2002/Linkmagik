import { getLinks } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const links = await getLinks();
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch links' },
      { status: 500 }
    );
  }
}
