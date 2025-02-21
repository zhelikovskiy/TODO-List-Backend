import { z } from 'zod';

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

export const UserValidationSchema = {
	registerUserSchema,
	loginUserSchema,
	updateUserSchema,
};
