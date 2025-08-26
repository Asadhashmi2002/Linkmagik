const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

// Test database connection
async function testDatabase() {
  console.log('=== TESTING DATABASE CONNECTION ===');
  console.log('POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
  console.log('POSTGRES_URL length:', process.env.POSTGRES_URL?.length || 0);
  
  if (!process.env.POSTGRES_URL) {
    console.error('❌ POSTGRES_URL not found in .env.local');
    return;
  }

  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: false
  });

  try {
    console.log('✅ Database pool created');
    
    // Test connection
    const client = await pool.connect();
    console.log('✅ Database connection successful');
    
    // Test query
    const result = await client.query('SELECT COUNT(*) FROM links');
    console.log('✅ Database query successful');
    console.log('Total links in database:', result.rows[0].count);
    
    // Test getting existing links
    const linksResult = await client.query('SELECT * FROM links ORDER BY created_at DESC');
    console.log('✅ Existing links:');
    linksResult.rows.forEach(link => {
      console.log(`- ${link.short_code} -> ${link.long_url} (${link.clicks} clicks)`);
    });
    
    // Test specific short code
    console.log('\n=== TESTING SPECIFIC SHORT CODE ===');
    const testResult = await client.query('SELECT * FROM links WHERE short_code = $1', ['u1TlyiWS']);
    if (testResult.rows.length > 0) {
      console.log('✅ Found u1TlyiWS:', testResult.rows[0]);
    } else {
      console.log('❌ u1TlyiWS not found in database');
    }
    
    // Test creating a new link
    console.log('\n=== TESTING CREATE NEW LINK ===');
    const newShortCode = 'test123';
    const newLongUrl = 'https://youtube.com';
    const insertResult = await client.query(
      'INSERT INTO links (long_url, short_code, description) VALUES ($1, $2, $3) RETURNING *',
      [newLongUrl, newShortCode, 'Test link']
    );
    console.log('✅ Created new link:', insertResult.rows[0]);
    
    // Verify the new link
    const verifyResult = await client.query('SELECT * FROM links WHERE short_code = $1', [newShortCode]);
    console.log('✅ Verified new link:', verifyResult.rows[0]);
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  }
}

testDatabase();
