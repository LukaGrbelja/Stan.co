function errorHandler(err, req, res, next) {
	res.status(err.statusCode || 500);
	res.json({
		message: err?.message,
		error: {
			path: req.path,
			stack: err?.stack,
		},
		statusCode: err?.statusCode || 500,
	});
}

export class HttpError extends Error {

	statusCode;

	constructor(statusCode, error) {
		const formatErrorMessage = error.message || error;
		super(formatErrorMessage);
		this.message = formatErrorMessage
		this.statusCode = statusCode
	}
}

export default errorHandler;