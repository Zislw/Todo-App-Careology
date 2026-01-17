import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
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

export const pool = new sql.ConnectionPool(config);
export const poolConnect = pool.connect().then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
  throw error;
});