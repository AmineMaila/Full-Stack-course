const logger = require('./logger')


const requestLogger = (req, res, next) => {
	logger.info('Method: ', req.method)
	logger.info('Path: ', req.path)
	logger.info('Body: ', req.body)
	logger.info('---')
	next()
}

const errorHandler = (err, req, res, next) => {
	logger.error(err)

	if (err.name === 'CastError') {
		return res.status(400).send({error: "invalid input (place_holder)"})
	}

	next(error)
}

const unknownEndpoint = (req, res) => {
	return (res.status(404).send({message: 'unknown endpoint'}))
}

module.exports = {
	requestLogger,
	errorHandler,
	unknownEndpoint
}