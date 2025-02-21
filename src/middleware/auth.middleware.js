import jwt from 'jsonwebtoken';
import userService from '../user/user.service.js';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		if (!token) {
			return res.status(401).json({ error: 'No token provided' });
		}

		const decoded = jwt.decode(token, process.env.JWT_SECRET);
		if (!decoded || !decoded.sub) {
			return res.status(401).json({ error: 'Invalid token' });
		}

		const user = await userService.getOneById(decoded.sub);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		req.user = {
			id: user.id,
			name: user.name,
			email: user.email,
		};
		next();
	} catch (err) {
		if (err.name === 'JsonWebTokenError') {
			return res.status(401).json({ error: 'Invalid token' });
		}
		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({ error: 'Token expired' });
		}
		return res.status(500).json({ error: 'Internal server error' });
	}
};

export default auth;
