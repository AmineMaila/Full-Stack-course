const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
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

	try {
		const user = await User.findOne()

		const blog = new Blog({
			title: title,
			author: author,
			url: url,
			likes: likes ? likes : 0,
			user: user._id
		})

		const result = await blog.save()
		user.blogs.push(blog._id)
		user.save()
		res.status(201).json(result)
	}
	catch (e) {
		next(e)
	}
})

blogsRouter.delete('/:id', async (req, res, next) => {
	try {
		await Blog.findByIdAndDelete(req.params.id)
		res.status(204).end()
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