import sql from 'mssql';
import { config } from './config';

export const pool = new sql.ConnectionPool(config);
export const poolConnect = pool.connect().then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
  throw error;
});
