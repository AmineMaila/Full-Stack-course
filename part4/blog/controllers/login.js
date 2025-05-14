const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

loginRouter.post('/', async (req, res, next) => {
	const { username, password } = req.body

	try {
		const user = await User.findOne({ username }).lean()
		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(password, user.passwordHash)
		if (!user || !passwordCorrect)
			return res.status(400).json({ error: 'username or password incorrect' })
		const payload = {
			username,
			id: user._id
		}

		const token = jwt.sign(payload, SECRET)

		res.status(200).send({ token, username, name: user.name })
	}
	catch (e) {
		next(e)
	}
})

module.exports = loginRouter