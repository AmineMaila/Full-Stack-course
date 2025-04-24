import { useState } from 'react'

const Numbers = ({ person }) => {
	return (
		<div>
			<p>{person.name} {person.number}</p>
		</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
	
	const filteredPersons = filter.trim() === ''
		? persons
		: persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase().trim()))

	const handleFilterChange = (event) => {
		
		setFilter(event.target.value)
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumChange = (event) => {
		setNewNumber(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()
		const trimmedNewName = newName.trim()
		const trimmedNewNum = newNumber.trim()
		if (trimmedNewName === '' ) {
			alert(`field [name] must be filled`)
			return;
		}else if (trimmedNewNum === '') {
			alert(`field [number] must be filled`)
			return;
		}

		if (persons.find((p) => trimmedNewName === p.name)){
			alert(`${trimmedNewName} is already added to phonebook`)
			return;
		}
		const personObj = {name: trimmedNewName, number: newNumber, id: persons.length + 1}
		setPersons(persons.concat(personObj))
		setNewName('')
		setNewNumber('')
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<div>filter shown with <input value={filter} onChange={handleFilterChange}/></div>
			<h2>add a new</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
				<div>number: <input value={newNumber} onChange={handleNumChange} /></div>
        <div><button type="submit" onClick={addPerson}>add</button></div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => <Numbers key={person.name} person={person}/>)}
    </div>
  )
}

export default App