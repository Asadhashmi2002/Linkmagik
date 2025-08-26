import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const SALT_ROUNDS = 10;

// Create a connection pool only if POSTGRES_URL is available
let pool: Pool | null = null;

if (process.env.POSTGRES_URL) {
  const isLocalConnection = process.env.POSTGRES_URL.includes('localhost') ||
                           process.env.POSTGRES_URL.includes('127.0.0.1');
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: isLocalConnection ? false : { rejectUnauthorized: false }
  });
}

export interface JWTPayload {
  userId: number;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export interface User {
  id: number;
  email: string;
  is_admin: boolean;
  created_at: Date;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: User): string => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      isAdmin: user.is_admin 
    }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  if (!pool) {
    throw new Error('Database not connected - POSTGRES_URL not available');
  }

  try {
    const result = await pool.query(
      'SELECT id, email, password_hash, is_admin, created_at FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      is_admin: user.is_admin,
      created_at: user.created_at
    };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

export const getUserById = async (userId: number): Promise<User | null> => {
  if (!pool) {
    throw new Error('Database not connected - POSTGRES_URL not available');
  }

  try {
    const result = await pool.query(
      'SELECT id, email, is_admin, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
};
