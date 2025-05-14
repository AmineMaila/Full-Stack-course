const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

blogsRouter.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
		res.json(blogs)
	}
	catch (e) {
		next(e)
	}
})

const extractToken = (req) => {
	const token = req.get('authorization')
	if (!token || !token.includes('Bearer'))
		return null
	return (token.replace('Bearer ', ''))
}

blogsRouter.post('/', async (req, res, next) => {
	const { title, author, url, likes } = req.body

	if (!title || !url)
		return res.status(400).end()

	try {
		if (!req.token)
			return (res.status(400).json({ error: 'Auth token missing' }))
		const decodedToken = jwt.verify(req.token, SECRET)
		if (!decodedToken)
			return (res.status(401).end())
		const user = await User.findById(decodedToken.id)

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
		if (!req.token)
			return res.status(400).json({ error: 'Auth token missing' })
		const decodedToken = jwt.verify(req.token, SECRET)

		const blog = await Blog.findById(req.params.id)
		if (!blog)
			return res.status(404).end()

		if (decodedToken.id === blog.user.toString()) {
			blog.deleteOne()
			res.status(204).end()
		} else {
			return res.status(401).json({ error: 'Unauthorized' })
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