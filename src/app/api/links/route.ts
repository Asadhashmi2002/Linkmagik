import { getLinks, createLink } from '@/lib/db';
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

export async function POST(request: Request) {
  try {
    const { longUrl, description } = await request.json();
    
    if (!longUrl) {
      return NextResponse.json(
        { error: 'Long URL is required' },
        { status: 400 }
      );
    }

    const link = await createLink(longUrl, description || '');
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json(
      { error: 'Failed to create link' },
      { status: 500 }
    );
  }
}
