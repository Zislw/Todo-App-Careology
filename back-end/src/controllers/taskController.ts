import { Request, Response } from 'express';
import { pool } from '../db/connection';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { userUid } = req.query;
    
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
          ISNULL(p.name, 'None') as priorityName,
          p.priority as priorityLevel
        FROM task t
        LEFT JOIN [PRIORITY] p ON t.priorityUid = p.uid
        WHERE t.userUid = @userUid
        ORDER BY t.dueDate
      `);
    
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, dueDate, isCompleted, priorityUid, userUid } = req.body;
  try {
    await pool.request()
      .input('title', title)
      .input('dueDate', dueDate)
      .input('isCompleted', isCompleted)
      .input('priorityUid', priorityUid)
      .input('userUid', userUid)
      .query('INSERT INTO task (uid,title, dueDate, isCompleted, priorityUid, userUid) VALUES (NEWID(), @title, @dueDate, @isCompleted, @priorityUid, @userUid)');
    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskUid } = req.params;
  const { title, dueDate, isCompleted, priorityUid, userUid } = req.body;
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
          p.name as priorityName,
          p.priority as priorityLevel
        FROM task t
        LEFT JOIN [PRIORITY] p ON t.priorityUid = p.uid
        WHERE t.uid = @uid
      `);
    
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { taskUid } = req.params;
  try {
    await pool.request()
      .input('uid', taskUid)
      .query('DELETE FROM task WHERE uid = @uid');
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err });
  }
};

export const getAllPriorities = async (req: Request, res: Response) => {
  try {
    const result = await pool.request()
      .query('SELECT uid, name, priority FROM [PRIORITY] WHERE isActive = 1 ORDER BY priority');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching priorities', error: err });
  }
};
