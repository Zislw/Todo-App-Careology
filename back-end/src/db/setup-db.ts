import sql from 'mssql';
import { config } from './config';

async function setupDatabase() {
  let pool: sql.ConnectionPool | null = null;
  
  try {
    console.log('🔌 Connecting to SQL Server...');
    pool = await new sql.ConnectionPool({...config, database: 'master'}).connect();
    console.log('✅ Connected!\n');

    console.log('📦 Creating database TodoDB...');
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TodoDB')
      BEGIN
        CREATE DATABASE TodoDB;
      END
    `);
    console.log('✅ Database ready\n');

    await pool.close();
    config.database = 'TodoDB';
    pool = await new sql.ConnectionPool(config).connect();

    console.log('👤 Creating USER table...');
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'USER')
      BEGIN
        CREATE TABLE [USER](
          uid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
          fullName VARCHAR(30),
          email VARCHAR(30) UNIQUE,
          password VARCHAR(100),
          isActive BIT DEFAULT(1)
        );
      END
    `);
    console.log('✅ USER table ready\n');

    console.log('🏷️  Creating PRIORITY table...');
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PRIORITY')
      BEGIN
        CREATE TABLE [PRIORITY](
          uid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
          name VARCHAR(100),
          isActive BIT DEFAULT(1)
        );
      END
    `);
    console.log('✅ PRIORITY table ready\n');

    console.log('✅ Creating TASK table...');
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TASK')
      BEGIN
        CREATE TABLE TASK(
          uid UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
          title VARCHAR(100),
          dueDate DATETIME,
          userUid UNIQUEIDENTIFIER,
          priorityUid UNIQUEIDENTIFIER,
          isCompleted BIT DEFAULT(0),
          isActive BIT DEFAULT(1),
          FOREIGN KEY (userUid) REFERENCES [USER](uid),
          FOREIGN KEY (priorityUid) REFERENCES [PRIORITY](uid)
        );
      END
    `);
    console.log('✅ TASK table ready\n');

    console.log('📋 Adding default priorities...');
    const priorityCheck = await pool.request().query('SELECT COUNT(*) as count FROM [PRIORITY]');
    
    if (priorityCheck.recordset[0].count === 0) {
      await pool.request().query(`
        INSERT INTO [PRIORITY](uid, name) VALUES
        (NEWID(), 'high'),
        (NEWID(), 'medium'),
        (NEWID(), 'low');
      `);
      console.log('✅ Priorities added\n');
    } else {
      console.log('ℹ️  Priorities already exist\n');
    }

    console.log('🎉 SUCCESS! Database is ready to use!');
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    throw error;
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

setupDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
