require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return (JSON.stringify(req.body))
})

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return (res.status(400).send({ error: 'malformed id' }))
  } else if (error.name === 'ValidationError') {
    return (res.status(400).send({ error: error.message }))
  }

  console.log(error.message)
  next(error)
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(people => {
      res.json(people)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  const time = new Date()
  Person.countDocuments()
    .then(size => {
      const payload = `
        <p>Phonebook has info for ${size} people</p>
        <p>${time}</p>`
      res.send(payload)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (!person)
        return res.status(404).end()
      res.json(person)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({
    name: name,
    number: number
  })
  person.save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body

  Person.findById(req.params.id)
    .then(person => {
      if (!person)
        return res.status(404).end()

      person.number = number
      person.save()
        .then(result => res.json(result))
        .catch(error => next(error))
    })
    .catch(error => next(error))
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
  console.log('Listing on port ', PORT)
})