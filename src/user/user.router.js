import { Router } from 'express';
import userContoller from './user.contoller.js';
import auth from '../middleware/auth.middleware.js';

const router = Router();

router.patch('/password', auth, userContoller.updatePassword);

export default router;
