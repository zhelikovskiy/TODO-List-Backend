import { Router } from 'express';
import authController from './auth.controller.js';
import validationMiddleware from '../validation/validation.middleware.js';
import { UserValidationSchema } from '../validation/validation.schemes.js';

const router = Router();

router.post(
	'/register',
	validationMiddleware(UserValidationSchema.registerUserSchema),
	authController.register
);

router.post(
	'/login',
	validationMiddleware(UserValidationSchema.loginUserSchema),
	authController.login
);

export default router;
