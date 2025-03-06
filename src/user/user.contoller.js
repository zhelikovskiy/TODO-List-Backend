import userService from './user.service.js';

const updatePassword = async (req, res, next) => {
	try {
		const { oldPassword, newPassword } = req.body;

		await userService.updatePassword(req.user.id, {
			oldPassword,
			newPassword,
		});

		return res.status(200).json({ message: 'Password updated successfully' });
	} catch (err) {
		next(error);
	}
};

const getUserInfo = async (req, res, next) => {
	try {
		const user = await userService.getOneById(req.user.id);

		return res.status(200).json({ user });
	} catch (err) {
		next(error);
	}
};

export default {
	updatePassword,
	getUserInfo,
};
