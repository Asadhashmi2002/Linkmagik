import { deleteLink } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Short code is required' },
        { status: 400 }
      );
    }

    const success = await deleteLink(code);
    
    if (success) {
      return NextResponse.json(
        { message: 'Link deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      { error: 'Failed to delete link' },
      { status: 500 }
    );
  }
}
