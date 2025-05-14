const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { authTokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
		res.json(blogs)
	}
	catch (e) {
		next(e)
	}
})

blogsRouter.post('/', authTokenExtractor, userExtractor, async (req, res, next) => {
	const { title, author, url, likes } = req.body

	if (!title || !url)
		return res.status(400).end()

	try {
		const blog = new Blog({
			title: title,
			author: author,
			url: url,
			likes: likes || 0,
			user: req.user._id
		})

		const result = await blog.save()
		req.user.blogs.push(blog._id)
		await req.user.save()
		res.status(201).json(result)
	}
	catch (e) {
		next(e)
	}
})

blogsRouter.delete('/:id', authTokenExtractor, userExtractor, async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id)
		if (!blog)
			return res.status(404).end()

		if (req.user._id.equals(blog.user)) {
			await blog.deleteOne()
			res.status(204).end()
		} else {
			res.status(401).json({ error: 'Invalid token' })
		}
	}
	catch (e) {
		next(e)
	}
})

blogsRouter.put('/:id', async (req, res, next) => {
	const { likes } = req.body
	
	try {
		const blog = await Blog.findById(req.params.id)
		blog.likes = likes
		await blog.save()
		res.status(204).end()
	}
	catch (e) {
		next(e)
	}
})

module.exports = blogsRouter