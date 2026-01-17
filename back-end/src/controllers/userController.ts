import { Request, Response } from 'express';
import { pool } from '../db/connection';

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  try {
    // Check if user exists
    const userCheck = await pool.request()
      .input('email', email)
      .query('SELECT * FROM [user] WHERE email = @email');
    
    if (userCheck.recordset.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user (storing password as plain text for simplicity)
    const result = await pool.request()
      .input('fullName', fullName)
      .input('email', email)
      .input('password', password)
      .query(`INSERT INTO [user] (uid, fullName, email, password)
              OUTPUT INSERTED.uid, INSERTED.fullName, INSERTED.email
              VALUES (NEWID(), @fullName, @email, @password)`);
    
    res.status(201).json({ 
      details: result.recordset[0], 
      message: 'User registered successfully' 
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await pool.request()
      .input('email', email)
      .input('password', password)
      .query('SELECT uid, fullName, email FROM [user] WHERE email = @email AND password = @password');
    
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({ 
      details: result.recordset[0], 
      message: 'Login successful' 
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};
