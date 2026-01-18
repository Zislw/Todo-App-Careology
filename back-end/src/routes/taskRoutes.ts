import { Router } from 'express';
import { createTask, deleteTask, getAllTasks, updateTask, getAllPriorities } from '../controllers/taskController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Apply authentication to all task routes
router.use(requireAuth);

router.post('/addTask', createTask);
router.put('/updateTask/:taskUid', updateTask);
router.delete('/deleteTask/:taskUid', deleteTask);
router.get('/getAllTasks/:userUid', getAllTasks);
router.get('/priorities', getAllPriorities);

export default router;
