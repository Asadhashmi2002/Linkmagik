import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    if (!process.env.POSTGRES_URL) {
      return NextResponse.json(
        { error: 'POSTGRES_URL not configured' },
        { status: 500 }
      );
    }

    const isLocalConnection = process.env.POSTGRES_URL.includes('localhost') ||
                             process.env.POSTGRES_URL.includes('127.0.0.1');
    
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: isLocalConnection ? false : { rejectUnauthorized: false }
    });

    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if admin user exists
    const adminEmail = 'asadalihashmi2002@gmail.com';
    const adminPassword = 'asad123';
    
    const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail]);
    
    if (userCheck.rows.length === 0) {
      // Create admin user
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await pool.query(`
        INSERT INTO users (email, password_hash, is_admin) 
        VALUES ($1, $2, $3)
      `, [adminEmail, passwordHash, true]);
      
      await pool.end();
      
      return NextResponse.json({
        message: 'Admin user created successfully',
        email: adminEmail,
        password: adminPassword
      });
    } else {
      await pool.end();
      
      return NextResponse.json({
        message: 'Admin user already exists',
        email: adminEmail
      });
    }
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
