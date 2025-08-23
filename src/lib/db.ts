import { Pool } from 'pg';

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

export interface Link {
  id: number;
  longUrl: string;
  shortCode: string;
  description: string;
  clicks: number;
  createdAt: Date;
}

const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encode(id: number): string {
    if (id === 0) return base62Chars[0];
    let shortCode = '';
    while (id > 0) {
        shortCode = base62Chars[id % 62] + shortCode;
        id = Math.floor(id / 62);
    }
    return shortCode.padStart(4, base62Chars[0]);
}

export const getLinks = async (): Promise<Link[]> => {
  if (!pool) {
    console.warn('Database not connected - POSTGRES_URL not available');
    return [];
  }

  try {
    const { rows } = await pool.query(`
      SELECT id, long_url, short_code, description, clicks, created_at
      FROM links 
      ORDER BY created_at DESC
    `);
    
    return rows.map(row => ({
      id: row.id,
      longUrl: row.long_url,
      shortCode: row.short_code,
      description: row.description || '',
      clicks: row.clicks,
      createdAt: new Date(row.created_at)
    }));
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
};

export const createLink = async (longUrl: string, description: string): Promise<Link> => {
  if (!pool) {
    throw new Error('Database not connected - POSTGRES_URL not available');
  }

  try {
    // Check if link already exists
    const existingResult = await pool.query(`
      SELECT id, long_url, short_code, description, clicks, created_at
      FROM links 
      WHERE long_url = $1
    `, [longUrl]);
    
    if (existingResult.rows.length > 0) {
      const existing = existingResult.rows[0];
      return {
        id: existing.id,
        longUrl: existing.long_url,
        shortCode: existing.short_code,
        description: existing.description || '',
        clicks: existing.clicks,
        createdAt: new Date(existing.created_at)
      };
    }

    // Get the next ID for encoding
    const idResult = await pool.query('SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM links');
    const nextId = idResult.rows[0].next_id;
    const shortCode = encode(nextId);

    // Insert new link
    const result = await pool.query(`
      INSERT INTO links (long_url, short_code, description)
      VALUES ($1, $2, $3)
      RETURNING id, long_url, short_code, description, clicks, created_at
    `, [longUrl, shortCode, description]);

    const newLink = result.rows[0];
    return {
      id: newLink.id,
      longUrl: newLink.long_url,
      shortCode: newLink.short_code,
      description: newLink.description || '',
      clicks: newLink.clicks,
      createdAt: new Date(newLink.created_at)
    };
  } catch (error) {
    console.error('Error creating link:', error);
    throw new Error('Failed to create link');
  }
};

export const getLinkByCode = async (shortCode: string): Promise<Link | undefined> => {
  if (!pool) {
    throw new Error('Database not connected - POSTGRES_URL not available');
  }

  try {
    // First, get the link
    const result = await pool.query(`
      SELECT id, long_url, short_code, description, clicks, created_at
      FROM links 
      WHERE short_code = $1
    `, [shortCode]);

    if (result.rows.length === 0) {
      return undefined;
    }

    const link = result.rows[0];

    // Increment clicks
    await pool.query(`
      UPDATE links 
      SET clicks = clicks + 1 
      WHERE id = $1
    `, [link.id]);

    return {
      id: link.id,
      longUrl: link.long_url,
      shortCode: link.short_code,
      description: link.description || '',
      clicks: link.clicks + 1, // Return incremented count
      createdAt: new Date(link.created_at)
    };
  } catch (error) {
    console.error('Error fetching link by code:', error);
    return undefined;
  }
};
