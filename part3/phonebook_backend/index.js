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

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
	Person.find({})
		.then(people => {
			res.json(people)
		})
		.catch(error => {res.status(500).end(JSON.stringify({error: error.message}))})
})

app.get('/info', (req, res) => {
	const time = new Date()

	const payload = `
		<p>Phonebook has info for ${people.length} people</p>
		<p>${time}</p>`
	res.send(payload)
})

app.get('/api/persons/:id', (req, res) => {
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
	else if (people.find(person => person.name === name))
		res.status(400).json({error: "name must be unique"})
	else {
		const person = {
			id: String(Math.floor(Math.random() * 10000)),
			name: name,
			number: number
		}
		people.push(person)
		res.status(201).json(person)
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id

	const indexOfObj = people.findIndex(person => person.id === id)
	if (indexOfObj !== -1) {
		people.splice(indexOfObj, 1)
		res.status(204).end()
	} else
		res.status(404).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log("Listing on port ", PORT)
})