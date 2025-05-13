const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res, next) => {
	try {
		const users = await User.find({})
		res.json(users)
	}
	catch (e) {
		next(e)
	}
})

usersRouter.post('/', async (req, res, next) => {
	const { username, name, password } = req.body

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

module.exports = usersRouter