const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	name: String,
	passwordHash: String,
})

userSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = document._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
		delete returnedObj.passwordHash
	}
})

module.exports = mongoose.model('User', userSchema)