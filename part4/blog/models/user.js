const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		minlength: [3, 'username should be at least 3 characters long'],
		required: [true, 'username missing']
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