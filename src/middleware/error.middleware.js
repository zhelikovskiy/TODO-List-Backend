const errorHandler = (err, req, res, next) => {
	console.error(err);

	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';

	res.status(statusCode).json({
		error: message,
		...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Включаем стек ошибок только в режиме разработки
	});
};

export default errorHandler;
