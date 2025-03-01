import { Task, User } from '../db.js';

const createOne = async (user, data) => {
	try {
		const { title, description, status } = data;

		const task = await Task.create({
			title,
			description,
			status,
			userId: user.id,
		});

		return task;
	} catch (error) {
		throw new Error(error);
	}
};

const getOneById = async (id) => {
	try {
		return Task.findByPk(id);
	} catch (error) {
		throw new Error(error);
	}
};

const getAllByUser = async (user) => {
	try {
		return Task.findAll({ where: { userId: user.id } });
	} catch (error) {
		throw new Error(error);
	}
};

const updateOne = async (task, data) => {
	try {
		const { title, description, status } = data;

		task.title = title ? title : task.title;
		task.description = description ? description : task.description;
		task.status = status ? status : task.status;

		return task.save();
	} catch (error) {
		throw new Error(error);
	}
};

const deleteOne = async (task) => {
	try {
		return task.destroy();
	} catch (error) {
		throw new Error(error);
	}
};

export default { createOne, getAllByUser, getOneById, updateOne, deleteOne };
