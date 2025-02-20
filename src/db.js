import { Sequelize, DataTypes, ENUM } from 'sequelize';

export const STATUSES = {
	PENDING: 'pending',
	IN_PROGRESS: 'in-progress',
	COMPLETED: 'completed',
};

export const ROLES = {
	ADMIN: 'admin',
	USER: 'user',
};

const sequelize = new Sequelize('sqlite::memory:');

export const User = sequelize.define('User', {
	name: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.ENUM, values: ROLES },
});

export const Task = sequelize.define('Task', {
	title: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	status: {
		type: DataTypes.ENUM,
		values: STATUSES,
	},
});

export default sequelize;
