import { Pool } from 'pg';

// Create a connection pool only if POSTGRES_URL is available
let pool: Pool | null = null;

console.log('=== DATABASE CONNECTION DEBUG ===');
console.log('POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
console.log('POSTGRES_URL length:', process.env.POSTGRES_URL?.length || 0);

if (process.env.POSTGRES_URL) {
  try {
    // Check if this is a local connection (localhost or 127.0.0.1)
    const isLocalConnection = process.env.POSTGRES_URL.includes('localhost') || 
                             process.env.POSTGRES_URL.includes('127.0.0.1');
    
    console.log('Is local connection:', isLocalConnection);
    
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: isLocalConnection ? false : {
        rejectUnauthorized: false
      }
    });
    
    console.log('Database pool created successfully');
  } catch (error) {
    console.error('Error creating database pool:', error);
    pool = null;
  }
} else {
  console.error('POSTGRES_URL environment variable is not set!');
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

function generateRandomShortCode(length: number = 8): string {
    let shortCode = '';
    for (let i = 0; i < length; i++) {
        shortCode += base62Chars[Math.floor(Math.random() * base62Chars.length)];
    }
    return shortCode;
}

async function generateUniqueShortCode(): Promise<string> {
    let shortCode: string;
    let attempts = 0;
    const maxAttempts = 10;
    
    do {
        shortCode = generateRandomShortCode(8);
        attempts++;
        
        // Check if this short code already exists
        if (pool) {
            const result = await pool.query('SELECT id FROM links WHERE short_code = $1', [shortCode]);
            if (result.rows.length === 0) {
                return shortCode; // Found unique code
            }
        } else {
            return shortCode; // If no database, just return random code
        }
    } while (attempts < maxAttempts);
    
    // If we can't find a unique code after max attempts, add timestamp
    return shortCode + Date.now().toString(36);
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

    // Generate unique random short code
    const shortCode = await generateUniqueShortCode();

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
  console.log('=== GET LINK BY CODE DEBUG ===');
  console.log('Short code:', shortCode);
  console.log('Pool exists:', !!pool);
  
  if (!pool) {
    console.error('Database pool is null - POSTGRES_URL not available');
    throw new Error('Database not connected - POSTGRES_URL not available');
  }

  try {
    console.log('Executing database query for short code:', shortCode);
    
    // First, get the link
    const result = await pool.query(`
      SELECT id, long_url, short_code, description, clicks, created_at
      FROM links 
      WHERE short_code = $1
    `, [shortCode]);

    console.log('Query result rows:', result.rows.length);
    console.log('Query result:', result.rows);

    if (result.rows.length === 0) {
      console.log('No link found for short code:', shortCode);
      return undefined;
    }

    const link = result.rows[0];
    console.log('Found link:', link);

    // Increment clicks
    await pool.query(`
      UPDATE links 
      SET clicks = clicks + 1 
      WHERE id = $1
    `, [link.id]);

    console.log('Clicks incremented successfully');

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
    console.error('Error details:', error);
    return undefined;
  }
};

export const deleteLink = async (shortCode: string): Promise<boolean> => {
  if (!pool) {
    throw new Error('Database not connected - POSTGRES_URL not available');
  }

  try {
    const result = await pool.query(`
      DELETE FROM links 
      WHERE short_code = $1
    `, [shortCode]);

    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error('Error deleting link:', error);
    return false;
  }
};
