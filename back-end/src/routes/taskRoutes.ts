import { Router } from 'express';
import { createTask, deleteTask, getAllTasks, updateTask, getAllPriorities } from '../controllers/taskController';

const router = Router();

router.post('/addTask', createTask);
router.put('/updateTask/:taskUid', updateTask);
router.delete('/deleteTask/:uid', deleteTask);
router.get('/getAllTasks', getAllTasks);
router.get('/priorities', getAllPriorities);

export default router;
