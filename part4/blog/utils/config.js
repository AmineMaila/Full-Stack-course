require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV !== 'test'
	? process.env.MONGODB_URI
	: process.env.TEST_MONGODB_URI

const PORT = process.env.PORT

const SECRET = process.env.SECRET

module.exports = { MONGODB_URI, PORT, SECRET }