const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
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
	} else if (err.name === 'AuthError') {
		return res.status(401).json({ error: err.message })
	}

	res.status(500).json({ error: 'Something went wrong'})
	next(err)
}

const unknownEndpoint = (req, res) => {
	return (res.status(404).send({message: 'unknown endpoint'}))
}

const authTokenExtractor = (req, res, next) => {
	const token = req.get('authorization')
	if (!token) {
		const err = new Error('Authorization header missing')
		err.name = 'AuthError'
		return next(err)
	} else if (!/^Bearer\s.+$/.test(token)) {
		const err = new Error('Invalid authorization header')
		err.name = 'AuthError'
		return next(err)
	}

	req.token = token.replace('Bearer ', '')
	next()
}

const userExtractor = async (req, res, next) => {
	const decodedToken = jwt.verify(req.token, SECRET)
	if (!decodedToken)
		return (res.status(401).json({ error: 'Invalid token' }))
	req.user = await User.findById(decodedToken.id)
	if (!req.user)
		return (res.status(404).json({ error: 'User not found' }))
	next()
}

module.exports = {
	requestLogger,
	errorHandler,
	unknownEndpoint,
	authTokenExtractor,
	userExtractor
}