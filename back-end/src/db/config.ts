import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: process.env.DB_SERVER || 'DESKTOP-6RIE3BH',
  database: process.env.DB_DATABASE || 'TodoDB',
  user: process.env.DB_USER || '1',
  password: process.env.DB_PASSWORD || '1',
  domain: process.env.DB_DOMAIN || 'desktop-6rie3bh',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};
