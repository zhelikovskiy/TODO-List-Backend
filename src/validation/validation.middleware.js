import { z } from 'zod';

const validate = (schema) => (req, res, next) => {
	const result = schema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ errors: result.error.format() });
	}
	next();
};

export default validate;
