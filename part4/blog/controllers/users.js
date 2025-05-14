const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res, next) => {
	try {
		const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
		res.json(users)
	}
	catch (e) {
		next(e)
	}
})

usersRouter.post('/', async (req, res, next) => {
	const { username, name, password } = req.body

	if (!password) {
		return (res.status(400).json({ error: 'password missing'}))
	} else if (password.length <= 3) {
		return (res.status(400).json({ error: 'password should be at least 3 characters long'}))
	}
	try {
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(password, saltRounds)
	
		const user = new User({
			name: name || 'Chad',
			username,
			passwordHash
		})

		const result = await user.save()
		res.status(201).json(result)
	}
	catch (e) {
		next(e)
	}
})

usersRouter.delete('/:username', async (req, res, next) => {
	try {
		await User.findOneAndDelete({ username: req.params.username })
		res.status(204).end()
	}
	catch (e) {
		next(e)
	}
})

module.exports = usersRouter