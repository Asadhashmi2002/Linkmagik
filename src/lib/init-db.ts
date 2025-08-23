import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function initDatabase() {
  try {
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
      CREATE INDEX IF NOT EXISTS idx_links_short_code ON links(short_code)
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC)
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}
