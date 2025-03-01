import express from 'express';
import dotenv from 'dotenv';
import authRouter from './auth/aut.router.js';
import userRouter from './user/user.router.js';
import taskRouter from './task/task.router.js';
import errorHandler from './middleware/error.middleware.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/tasks', taskRouter);

app.use(errorHandler);

export default app;
