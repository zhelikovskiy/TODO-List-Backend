import { z } from 'zod';
import { STATUSES } from '../db.js';

const registerUserSchema = z.object({
	name: z.string().min(3).max(255),
	email: z.string().email(),
	password: z.string().min(6).max(255),
});

const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(255),
});

const updateUserSchema = z.object({
	name: z.string().min(3).max(255).optional(),
	email: z.string().email().optional(),
});

const createTaskSchema = z.object({
	title: z.string().min(3).max(50),
	description: z.string().max(255).optional(),
	status: z.enum([STATUSES.PENDING, STATUSES.IN_PROGRESS]).optional(),
});

const updateTaskSchema = z.object({
	title: z.string().min(3).max(50).optional(),
	description: z.string().max(255).optional(),
	status: z
		.enum([STATUSES.PENDING, STATUSES.IN_PROGRESS, STATUSES.COMPLETED])
		.optional(),
});

export const UserValidationSchema = {
	registerUserSchema,
	loginUserSchema,
	updateUserSchema,
};

export const TaskValidationSchema = {
	createTaskSchema,
	updateTaskSchema,
};
