import { useEffect, useState } from 'react'
import personsServices from './services/persons'

const Person = ({ person, deletePerson }) => {
	return (
		<div>
			{person.name} {person.number}
			<button onClick={() => deletePerson(person.id)}>delete</button>
		</div>
		
	)
}

const Persons = ({ persons ,deletePerson ,filter }) => {

	const filteredPersons = filter.trim() === ''
		? persons
		: persons.filter(
			(person) => (
				person.name.toLowerCase().includes(filter.toLowerCase().trim())
			))

	return (
		<div>
			{filteredPersons.map((person) => (
				<Person key={person.name} deletePerson={deletePerson} person={person}/>
			))}
		</div>
	)
}

const Search = ({ filter, onChange }) => {
	return (
		<div>filter shown with <input value={filter} onChange={onChange}/></div>
	)
}

const PersonForm = (props) => {
	return (
		<div>
			<form>
					<div>name: <input value={props.name} onChange={props.onNameChange} /></div>
					<div>number: <input value={props.number} onChange={props.onNumChange} /></div>
					<div><button type="submit" onClick={props.addPerson}>add</button></div>
			</form>
		</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

	console.log(persons)
	useEffect(() => {
		personsServices.getAll()
			.then((initialPersons) => setPersons(initialPersons))
			.catch((error) => console.log('Error: ', error))
	}, [])

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
		
		const personObj = {
			name: trimmedNewName,
			number: newNumber,
			id: (persons.length + 1).toString()
		}

		personsServices.create(personObj)
			.then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
			})
			.catch(() => alert(`Could not create entry for ${personObj.name} on the server`))
	}

	const deletePerson = (id) => {
		
		personsServices.remove(id)
			.then(() => {
				setPersons(persons.filter(n => n.id !== id))
				console.log(persons)
			})
			.catch(() => {
				console.log(`couldn't delete ${persons.find(n => n.id === id).name}`)
			})

		// if (persons.find(n => n.id === id) !== undefined) {

		// } else {
		// 	alert('person doesn\'t exist on the database')
		// 	persons.map(n => n.id !== id)
		// }
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Search filter={filter} onChange={handleFilterChange} />
			<h2>add a new</h2>
			<PersonForm
				name={newName}
				number={newNumber}
				onNameChange={handleNameChange}
				onNumChange={handleNumChange}
				addPerson={addPerson}
			/>
      <h2>Numbers</h2>
			<Persons persons={persons} deletePerson={deletePerson} filter={filter} />
    </div>
  )
}

export default App