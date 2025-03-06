import request from 'supertest';
import app from '../src/app.js';
import { User, Task } from '../src/db.js';

describe('Task API', () => {
	const testData = {
		token: '',
		user: {},
		task: {},
	};

	beforeAll(async () => {
		await User.sync({ force: true });
		await Task.sync({ force: true });

		const response = await request(app).post('/api/auth/register').send({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		});

		testData.token = response.body.token;
		testData.user = response.body.user;
	});

	it('should create a new task', async () => {
		const response = await request(app)
			.post('/api/tasks/')
			.send({
				title: 'Task 1',
				description: 'Description 1',
			})
			.set('Authorization', `Bearer ${testData.token}`);

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('task');

		testData.task = response.body.task;
	});

	it('should get task by id', async () => {
		const response = await request(app)
			.get(`/api/tasks/${testData.task.id}`)
			.set('Authorization', `Bearer ${testData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('task');
	});

	it('should get all tasks by user', async () => {
		const response = await request(app)
			.get('/api/tasks/')
			.set('Authorization', `Bearer ${testData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('tasks');
	});

	it('should update task by id', async () => {
		const response = await request(app)
			.put(`/api/tasks/${testData.task.id}`)
			.send({
				title: 'Task 1 Updated',
				description: 'Description 1 Updated',
			})
			.set('Authorization', `Bearer ${testData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('task');
		expect(response.body.task.title).toBe('Task 1 Updated');
	});

	it('should delete task by id', async () => {
		const response = await request(app)
			.delete(`/api/tasks/${testData.task.id}`)
			.set('Authorization', `Bearer ${testData.token}`);

		expect(response.status).toBe(204);
	});
});
