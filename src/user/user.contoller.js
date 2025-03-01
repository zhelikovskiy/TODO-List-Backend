import userService from './user.service.js';

const updatePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;

		await userService.updatePassword(req.user.id, {
			oldPassword,
			newPassword,
		});

		return res.status(200).json({ message: 'Password updated successfully' });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

export default {
	updatePassword,
};
