import { getLinks, getLinkByCode } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('=== API TEST DB ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
    
    const links = await getLinks();
    console.log('Total links:', links.length);
    
    const testLink = await getLinkByCode('0001');
    console.log('Test link 0001:', testLink);
    
    return NextResponse.json({
      success: true,
      totalLinks: links.length,
      testLink: testLink,
      allLinks: links,
      environment: process.env.NODE_ENV,
      hasPostgresUrl: !!process.env.POSTGRES_URL
    });
  } catch (error) {
    console.error('API test-db error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
