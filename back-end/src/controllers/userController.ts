import { Request, Response } from 'express';
import { pool } from '../db/connection';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  try {
    // Check if user exists
    const userExists = await pool.request()
      .input('email', email)
      .query('SELECT * FROM [user] WHERE email = @email');
    
    if (userExists.recordset.length) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    const result = await pool.request()
      .input('fullName', fullName)
      .input('email', email)
      .input('password', hashedPassword)
      .query(`INSERT INTO [user] (uid, fullName, email, password)
              OUTPUT INSERTED.uid, INSERTED.fullName, INSERTED.email
              VALUES (NEWID(), @fullName, @email, @password)`);
    
    res.status(201).json({ 
      user: result.recordset[0], 
      message: 'User registered successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await pool.request()
      .input('email', email)
      .query('SELECT uid, fullName, email, password FROM [user] WHERE email = @email');
    
    if (!result.recordset.length) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.recordset[0];
    
    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({ 
      user: userWithoutPassword, 
      message: 'Login successful' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
