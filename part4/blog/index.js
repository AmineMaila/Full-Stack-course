const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('./utils/logger')

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const requestLogger = (req, res, next) => {
	logger.info('Method: ', req.method)
	logger.info('Path: ', req.path)
	logger.info('Body: ', req.body)
	logger.info('---')
	next()
}

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use(requestLogger)

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})