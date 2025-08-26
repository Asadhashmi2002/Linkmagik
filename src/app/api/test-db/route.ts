import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  try {
    if (!process.env.POSTGRES_URL) {
      return NextResponse.json(
        { error: 'POSTGRES_URL not configured' },
        { status: 500 }
      );
    }

    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    // Test the connection
    const result = await pool.query('SELECT NOW() as current_time');
    
    await pool.end();

    return NextResponse.json({
      message: 'Database connection successful',
      currentTime: result.rows[0].current_time,
      postgresUrl: process.env.POSTGRES_URL ? 'Configured' : 'Not configured'
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { error: 'Database connection failed', details: error.message },
      { status: 500 }
    );
  }
}
