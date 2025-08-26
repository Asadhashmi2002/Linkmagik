import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { Pool } from 'pg';

let pool: Pool | null = null;

if (process.env.POSTGRES_URL) {
  const isLocalConnection = process.env.POSTGRES_URL.includes('localhost') ||
                           process.env.POSTGRES_URL.includes('127.0.0.1');
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: isLocalConnection ? false : { rejectUnauthorized: false }
  });
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, isAdmin = false } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!pool) {
      return NextResponse.json(
        { error: 'Database not connected' },
        { status: 500 }
      );
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, is_admin) VALUES ($1, $2, $3) RETURNING id, email, is_admin, created_at',
      [email, passwordHash, isAdmin]
    );

    const user = result.rows[0];

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          isAdmin: user.is_admin
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
