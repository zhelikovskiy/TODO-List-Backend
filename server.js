import app from './src/app.js';
import db from './src/db.js';
import http from 'http';

const server = http.createServer(app);

server.listen(3000, async () => {
	try {
		await db.authenticate();
		await db.sync({ force: true });
		console.log('Database connected and synchronized');
		console.log('Server is running on port 3000');
	} catch (err) {
		console.error('Error: ' + err);
	}
});
