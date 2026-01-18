import { Request, Response } from 'express';
import { pool } from '../db/connection';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { userUid } = req.params;
    
    if (!userUid) {
      return res.status(400).json({ message: 'userUid is required' });
    }

    const result = await pool.request()
      .input('userUid', userUid)
      .query(`
        SELECT 
          t.uid, 
          t.title, 
          t.dueDate, 
          t.isCompleted, 
          t.userUid,
          t.priorityUid,
          ISNULL(p.name, 'None') as priorityName
        FROM task t
        LEFT JOIN [PRIORITY] p ON t.priorityUid = p.uid
        WHERE t.userUid = @userUid
        ORDER BY t.dueDate
      `);
    
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, dueDate, isCompleted, priorityUid, userUid } = req.body;
  
  // Validate required field
  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  try {
    const result = await pool.request()
      .input('title', title)
      .input('dueDate', dueDate || new Date())
      .input('isCompleted', isCompleted || false)
      .input('priorityUid', priorityUid || null)
      .input('userUid', userUid)
      .query(`
        INSERT INTO task (uid, title, dueDate, isCompleted, priorityUid, userUid) 
        OUTPUT INSERTED.uid, INSERTED.title, INSERTED.dueDate, INSERTED.isCompleted, INSERTED.priorityUid, INSERTED.userUid
        VALUES (NEWID(), @title, @dueDate, @isCompleted, @priorityUid, @userUid)
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskUid } = req.params;
  const { title, dueDate, isCompleted, priorityUid } = req.body;
  try {
    await pool.request()
      .input('uid', taskUid)
      .input('title', title)
      .input('dueDate', dueDate)
      .input('isCompleted', isCompleted)
      .input('priorityUid', priorityUid)
      .query('UPDATE task SET title = @title, dueDate = @dueDate, isCompleted = @isCompleted, priorityUid = @priorityUid WHERE uid = @uid');
    
    // Fetch and return the updated task with priority
    const result = await pool.request()
      .input('uid', taskUid)
      .query(`
        SELECT 
          t.uid, 
          t.title, 
          t.dueDate, 
          t.isCompleted, 
          t.userUid,
          t.priorityUid,
          ISNULL(p.name, 'None') as priorityName
        FROM task t
        LEFT JOIN [PRIORITY] p ON t.priorityUid = p.uid
        WHERE t.uid = @uid
      `);
    
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Error updating task', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskUid } = req.params;
  try {
    await pool.request()
      .input('uid', taskUid)
      .query('DELETE FROM task WHERE uid = @uid');
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

export const getAllPriorities = async (req: Request, res: Response) => {
  try {
    const result = await pool.request()
      .query('SELECT uid, name FROM [PRIORITY] WHERE isActive = 1');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching priorities', error });
  }
};
