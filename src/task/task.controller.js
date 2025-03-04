import taskService from './task.service.js';
import userService from '../user/user.service.js';

const createTask = async (req, res, next) => {
	try {
		const user = await userService.getOneById(req.user.id);

		const task = await taskService.createOne(user, req.body);

		return res.status(201).json({ message: 'Task created', data: task });
	} catch (error) {
		next(error);
	}
};

const getTask = async (req, res, next) => {
	try {
		const task = await taskService.getOneById(req.params.id);

		return res.status(200).json({ data: task });
	} catch (error) {
		next(error);
	}
};

const getTasks = async (req, res, next) => {
	try {
		const user = await userService.getOneById(req.user.id);

		const tasks = await taskService.getAllByUser(user);

		return res.status(200).json({ data: tasks });
	} catch (error) {
		next(error);
	}
};

const updateTask = async (req, res, next) => {
	try {
		const task = await taskService.getOneById(req.params.id);

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		if (task.userId !== req.user.id) {
			return res
				.status(403)
				.json({ error: 'You do not have permission to access this task' });
		}

		const updatedTask = await taskService.updateOne(task, req.body);

		return res.status(200).json({ message: 'Task updated', data: updatedTask });
	} catch (error) {
		next(error);
	}
};

const deleteTask = async (req, res, next) => {
	try {
		const task = await taskService.getOneById(req.params.id);

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		if (task.userId !== req.user.id) {
			return res
				.status(403)
				.json({ error: 'You do not have permission to access this task' });
		}

		const deletedTask = await taskService.deleteOne(task);

		return res.status(200).json({ message: 'Task deleted', data: deletedTask });
	} catch (error) {
		next(error);
	}
};

export default { createTask, getTask, getTasks, updateTask, deleteTask };
