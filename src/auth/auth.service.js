import bcrypt from 'bcrypt';

const passwordCheck = async (password, hashedPassword) => {
	return bcrypt.compare(password, hashedPassword);
};

export default {
	passwordCheck,
};
