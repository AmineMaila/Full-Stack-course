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
	const { title, author, url, likes } = req.body

	if (!title || !url)
		return res.status(400).end()

	const blog = new Blog({
		title: title,
		author: author,
		url: url,
		likes: likes ? likes : 0
	})

	try {
		const result = await blog.save()
		res.status(201).json(result)
	}
	catch (e) {
		next(e)
	}
})

module.exports = blogsRouter