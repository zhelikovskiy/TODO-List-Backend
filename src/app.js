import express from 'express';
import dotenv from 'dotenv';
import authRouter from './auth/aut.router.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

export default app;
