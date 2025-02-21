import userService from '../user/user.service.js';
import authService from './auth.service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const register = async (req, res) => {
	try {
		const user = await userService.createOne(req.body);

		const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		return res.status(201).json({ user, token });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userService.getOneByEmail(email);

		if (!user) {
			return res.status(400).json({ error: 'User not exists' });
		}

		const isMatch = await authService.passwordCheck(
			password,
			user.hashedPassword
		);

		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		return res.status(200).json({ user, token });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export default { register, login };
