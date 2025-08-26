import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const SALT_ROUNDS = 10;

// Admin credentials - updated for user
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'asadalihashmi2002@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'asad123';

export interface JWTPayload {
  username: string;
  iat: number;
  exp: number;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const authenticateUser = async (username: string, password: string): Promise<boolean> => {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};

export const getHashedAdminPassword = async (): Promise<string> => {
  return hashPassword(ADMIN_PASSWORD);
};
