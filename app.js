import express from 'express';
import db from './src/db';

const app = express();

app.use(express.json());

app.listen(3000, async () => {
	try {
		await db.authenticate();
		console.log('Database connected');
		console.log('Server is running on port 3000');
	} catch (err) {
		console.error('Error: ' + err);
	}
});
