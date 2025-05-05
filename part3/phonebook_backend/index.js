require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req, res) => {
	return (JSON.stringify(req.body))
})

const errorHandler = (error, req, res, next) => {
	console.log(error.message)
	if (error.name === 'CastError') {
		res.status(400).send({error: "malformed id"})
	}
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(people => {
			res.json(people)
		})
		.catch(error => next(error))
})

app.get('/info', (req, res) => {
	const time = new Date()

	const payload = `
		<p>Phonebook has info for ${people.length} people</p>
		<p>${time}</p>`
	res.send(payload)
})

app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id

	const person = people.find(person => person.id === id)
	if (person) {
		res.json(person)
	} else
		res.status(404).end()
})

app.post('/api/persons', (req, res) => {
	const {name, number} = req.body

	if (!name)
		res.status(400).json({error: "name is missing"})
	else if (!number)
		res.status(400).json({error: "number is missing"})
	// else if (people.find(person => person.name === name))
	// 	res.status(400).json({error: "name must be unique"})
	else {
		const person = new Person({
			name: name,
			number: number
		})
		person.save()
			.then(result => {
				res.status(201).json(result)
			})
			.catch(err => {
				res.status(500).end()
			})
	}
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then((result) => {
			if (!result)
				res.status(404).end()
			else
				res.status(204).end()
			})
		.catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log("Listing on port ", PORT)
})