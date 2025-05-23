const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mid = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI)
	.then(() => logger.info('Connected to MongoDB'))
	.catch(err => {
		logger.error('Connection to MongoDB refused. reason: ', err.message)
		process.exit(1)
	})

app.use(express.json())
app.use(mid.requestLogger)


app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(mid.unknownEndpoint)
app.use(mid.errorHandler)

module.exports = app