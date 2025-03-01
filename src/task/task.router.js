import { Router } from 'express';
import auth from '../middleware/auth.middleware.js';
import taskController from './task.controller.js';
import validate from '../validation/validation.middleware.js';
import { TaskValidationSchema } from '../validation/validation.schemes.js';

const router = Router();

router.post(
	'/',
	auth,
	validate(TaskValidationSchema.createTaskSchema),
	taskController.createTask
);

router.get('/:id', auth, taskController.getTask);

router.get('/', auth, taskController.getTasks);

router.put(
	'/:id',
	auth,
	validate(TaskValidationSchema.updateTaskSchema),
	taskController.updateTask
);

router.delete('/:id', auth, taskController.deleteTask);

export default router;
