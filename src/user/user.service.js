import { User } from '../db.js';
import bcrypt from 'bcrypt';
import { ROLES } from '../db.js';

const createOne = async (data) => {
	try {
		const { name, email, password } = data;

		const userExists = await User.findOne({ where: { email } });
		if (userExists) {
			throw new Error('Email already exists');
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const user = User.build();

		user.name = name;
		user.email = email;
		user.hashedPassword = passwordHash;
		user.role = ROLES.USER;

		return user.save();
	} catch (error) {
		throw error;
	}
};

const getOneById = async (id) => {
	try {
		const user = await User.findByPk(id);
		return user;
	} catch (error) {
		throw error;
	}
};

const getOneByEmail = async (email) => {
	try {
		const user = await User.findOne({ where: { email } });
		return user;
	} catch (error) {
		throw error;
	}
};

const updateOne = async (id, data) => {
	try {
		const user = await User.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});
		return user;
	} catch (error) {
		throw error;
	}
};

const updatePassword = async (id, data) => {
	try {
		const { oldPassword, newPassword } = data;

		const user = await User.findByPk(id);

		if (!user) {
			throw new Error('User not found');
		}

		if (!bcrypt.compare(oldPassword, user.hashedPassword)) {
			throw new Error('Invalid password');
		}

		const passwordHash = await bcrypt.hash(newPassword, 10);

		user.hashedPassword = passwordHash;

		return user.save;
	} catch (error) {
		throw error;
	}
};

const deleteOne = async (id) => {
	try {
		const user = await User.findByPk(id);
		await user.destroy();
		return user;
	} catch (error) {
		throw error;
	}
};

export default {
	createOne,
	getOneById,
	getOneByEmail,
	updateOne,
	updatePassword,
	deleteOne,
};
