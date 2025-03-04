import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const STATUSES = {
	PENDING: 'pending',
	IN_PROGRESS: 'in-progress',
	COMPLETED: 'completed',
};

export const ROLES = {
	ADMIN: 'admin',
	USER: 'user',
};

const dbStorage =
	process.env.DB_STORAGE === 'file' ? process.env.DB_FILE_PATH : ':memory:';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: dbStorage,
	logging: false,
});

export const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: { type: DataTypes.STRING, notEmpty: true },
		email: { type: DataTypes.STRING, unique: true, notEmpty: true },
		hashedPassword: { type: DataTypes.STRING, notEmpty: true },
		role: { type: DataTypes.STRING, values: ROLES },
	},
	{ timestamps: false }
);

export const Task = sequelize.define(
	'Task',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		status: {
			type: DataTypes.STRING,
			values: STATUSES,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
	},
	{ timestamps: false }
);

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export default sequelize;
