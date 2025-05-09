const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.find({})
		res.json(blogs)
	}
	catch (e) {
		next(e)
	}
})

blogsRouter.post('/', async (req, res, next) => {
	const blog = new Blog(req.body)

	try {
		const result = await blog.save()
		res.status(201).json(result)
	}
	catch (e) {
		next(e)
	}
})

module.exports = blogsRouter