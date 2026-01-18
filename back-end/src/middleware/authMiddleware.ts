import { Request, Response, NextFunction } from 'express';
import { pool } from '../db/connection';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userUid = req.headers['x-user-id'] as string;

    if (!userUid) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify user exists
    const result = await pool.request()
      .input('uid', userUid)
      .query('SELECT uid, email FROM [user] WHERE uid = @uid AND isActive = 1');

    if (!result.recordset.length) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    req.user = result.recordset[0];
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
