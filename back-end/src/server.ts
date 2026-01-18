import express from 'express';
import dotenv from 'dotenv';
import { poolConnect } from './db/connection';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));

// Routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);


// Database connection and server start
poolConnect.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to database:', err);
});
