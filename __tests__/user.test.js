import request from 'supertest';
import app from '../src/app';
import authService from '../src/auth/auth.service.js';
import { User } from '../src/db';

describe('User API', () => {
	const testData = {
		token: '',
		user: {},
	};

	beforeAll(async () => {
		await User.sync({ force: true });

		const response = await request(app).post('/api/auth/register').send({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		});

		testData.token = response.body.token;
		testData.user = response.body.user;
	});

	it('should get user info', async () => {
		const response = await request(app)
			.get('/api/user/info')
			.set('Authorization', `Bearer ${testData.token}`);

		expect(response.status).toBe(200);
		expect(response.body.user).toHaveProperty('id');
		expect(response.body.user.email).toBe('john.doe@example.com');
	});

	it.skip('should change user password', async () => {
		const response = await request(app)
			.patch('/api/user/password')
			.set('Authorization', `Bearer ${testData.token}`)
			.send({
				oldPassword: 'password123',
				newPassword: 'newpassword123',
			});

		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Password updated successfully');

		const userInfo = await request(app)
			.get('/api/user/info')
			.set('Authorization', `Bearer ${testData.token}`);

		const result = await authService.passwordCheck(
			'newpassword123',
			userInfo.body.user.hashedPassword
		);

		console.log(result);
		expect(result).toBe(true);
	});
});
