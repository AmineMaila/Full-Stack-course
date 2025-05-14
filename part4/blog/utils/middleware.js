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
		return res.status(400).json({ error: 'invalid input (place_holder)' })
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	} else if (err.code === 11000) {
		return res.status(400).json({ error: 'username must be unique'})
	}

	next(err)
}

const unknownEndpoint = (req, res) => {
	return (res.status(404).send({message: 'unknown endpoint'}))
}

const extractAuthToken = (req, res, next) => {
	const token = req.get('authorization')
	if (token && token.includes('Bearer'))
		req.token = token.replace('Bearer ', '')
	next()
}

module.exports = {
	requestLogger,
	errorHandler,
	unknownEndpoint,
	extractAuthToken
}