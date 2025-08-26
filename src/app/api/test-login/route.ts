import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Test with your credentials
    const user = await authenticateUser(email, password);
    
    if (user) {
      return NextResponse.json({ 
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          isAdmin: user.is_admin
        }
      });
    } else {
      return NextResponse.json({ 
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login test error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Login test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
