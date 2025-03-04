import request from 'supertest';
import app from '../src/app';
import { User } from '../src/db';

describe('Auth API', () => {
	beforeAll(async () => {
		await User.sync({ force: true });
	});

	it('should register a new user', async () => {
		const response = await request(app).post('/api/auth/register').send({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		});

		expect(response.status).toBe(201);
		expect(response.body.user).toHaveProperty('id');
		expect(response.body.user.email).toBe('john.doe@example.com');
		expect(response.body).toHaveProperty('token');
	});

	it('should not register a user with an existing email', async () => {
		const response = await request(app).post('/api/auth/register').send({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		});

		expect(response.status).toBe(500);
		expect(response.body.error).toBe('Email already exists');
	});

	it('should login an existing user', async () => {
		const response = await request(app).post('/api/auth/login').send({
			email: 'john.doe@example.com',
			password: 'password123',
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('token');
	});

	it('should not login a user with an incorrect password', async () => {
		const response = await request(app).post('/api/auth/login').send({
			email: 'john.doe@example.com',
			password: 'qwerty123',
		});

		expect(response.status).toBe(401);
		expect(response.body.error).toBe('Invalid credentials');
	});
});
