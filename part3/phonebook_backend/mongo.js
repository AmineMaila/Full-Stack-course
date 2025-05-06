const mongoose = require('mongoose')

if (process.argv.length !== 5 && process.argv.length !== 3){
  console.log('usage: \'node mongo.js <password>\' or \'node mongo.js <name> <number>\'')
  process.exit(1)
}

const url = `mongodb+srv://AmineMaila:${process.argv[2]}@cluster0.nblyvny.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false) // when set to false means you can query documents that don't follow the schema

mongoose.connect(url)
  .catch(err => {
    console.log('unable to connect to the database:', err.errorResponse?.errmsg)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })

} else if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find().then(people => {
    people.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}