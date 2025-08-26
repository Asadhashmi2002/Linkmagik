import { NextResponse } from 'next/server';
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

export async function GET() {
  if (!pool) {
    return NextResponse.json({ error: 'Database not connected' }, { status: 500 });
  }

  try {
    // Check if admin user exists
    const adminEmail = 'asadalihashmi2002@gmail.com';
    const result = await pool.query('SELECT id, email, is_admin, created_at FROM users WHERE email = $1', [adminEmail]);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      return NextResponse.json({ 
        message: 'Admin user found',
        user: {
          id: user.id,
          email: user.email,
          isAdmin: user.is_admin,
          createdAt: user.created_at
        }
      });
    } else {
      return NextResponse.json({ 
        message: 'Admin user not found',
        suggestion: 'Run /api/init-db to create admin user'
      });
    }
  } catch (error) {
    console.error('Error checking admin user:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
