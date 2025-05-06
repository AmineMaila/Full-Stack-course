const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
const PORT = process.env.PORT

const MAX_RETRIES = 3
const RETRY_DELAY = 3000
let retries = 0

const connectWithRetries = () => {
	mongoose.connect(uri)
		.then(() => {
			console.log('Connected to MongoDB')
			retries = 0
		})
		.catch(err => {
			console.log('MongoDB connection failed: ', err)
			if (retries < MAX_RETRIES) {
				retries++;
				console.log('Retrying...')
				setTimeout(connectWithRetries, RETRY_DELAY)
			} else {
				console.log('Max retries reached. exiting...')
				process.exit(1)
			}
		})
}

mongoose.connection.on('error', err => {
	console.log('MongoDB error: ', err)
})

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB connection lost. Retrying...')
	if (retries < MAX_RETRIES) {
		setTimeout(connectWithRetries, RETRY_DELAY)
	} else {
		console.log('Max retries reached. exiting...')
		process.exit(1)
	}
})

connectWithRetries()

mongoose.set('strictQuery', false) // when set to false means you can query documents that don't follow the schema

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
	},
	number: String,
})

personSchema.set('toJSON',{
	transform: (document, returnedObj) => {
		returnedObj.id = document._id.toString()
		delete returnedObj.__v
		delete returnedObj._id
	}
})

module.exports = mongoose.model('Person', personSchema)


