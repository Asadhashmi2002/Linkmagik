import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Create a connection pool only if POSTGRES_URL is available
let pool: Pool | null = null;

if (process.env.POSTGRES_URL) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

export async function initDatabase() {
  if (!pool) {
    throw new Error('Database not connected - POSTGRES_URL not available');
  }

  try {
    // Create the users table
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

    // Create the links table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        long_url TEXT NOT NULL,
        short_code VARCHAR(10) UNIQUE NOT NULL,
        description TEXT,
        clicks INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_links_short_code ON links(short_code)
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC)
    `);

    // Check if admin user exists, if not create one
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
      
      console.log('Admin user created successfully');
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}
