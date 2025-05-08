import { useEffect, useState } from 'react'
import personsServices from './services/persons'

const Person = ({ person, deletePerson }) => {
	return (
		<div>
			{person.name} {person.number}
			<button onClick={() => deletePerson(person)}>delete</button>
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

const Notification = ({ className, message }) => {
	if (message === null)
		return (null)

	return (
		<div className={className}>
			{message}
		</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		personsServices.getAll()
			.then((initialPersons) => setPersons(initialPersons))
			.catch((error) => {
				displayNotification(setErrorMessage, 'Failed to fetch data from the server')
				console.log('Error: ', error)
			})
	}, [])

	const displayNotification = (setNotif, msg) => {
		setNotif(msg)
		setTimeout(() => {
			setNotif(null)
		}, 5000)
	}

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

		const matchedPerson = persons.find((p) => trimmedNewName === p.name)
		if (matchedPerson) {
			if (confirm(`${matchedPerson.name} is already added to phonebook, replace the old number with the new one ?`)) {
				const updatedPerson = {...matchedPerson, number: trimmedNewNum}
				personsServices.update(updatedPerson.id, updatedPerson)
					.then((returnedPerson) => {
						displayNotification(setSuccessMessage, `${returnedPerson.name}'s number has been changed successfully!`)
						setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
						setNewName('')
						setNewNumber('')
					})
					.catch(() => {
						displayNotification(setErrorMessage, `Information of ${updatedPerson.name} has already been removed from the server`)
						setPersons(persons.filter(p => p.id !== updatedPerson.id))
					})
			}
			return;
		}


		const newPerson = {
			name: trimmedNewName,
			number: trimmedNewNum,
			id: (persons.length + 1).toString()
		}
		personsServices.create(newPerson)
			.then((returnedPerson) => {
				displayNotification(setSuccessMessage, `Added ${newPerson.name}`)
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
			})
			.catch((error) => {
				if (error.response && error.response.status === 400)
					displayNotification(setErrorMessage, error.response.data.error)
				else
					displayNotification(setErrorMessage, error.message)
			})
	}

	const deletePerson = (person) => {
		if (confirm(`Delete ${person.name} ?`)){
			personsServices.remove(person.id)
				.then(() => {
					console.log(persons)
					setPersons(persons.filter(n => n.id !== person.id))
				})
				.catch(() => {
					displayNotification(setErrorMessage, `Failed removing ${person}`)
				})
		}
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Notification className="success notification" message={successMessage} />
			<Notification className="error notification" message={errorMessage} />
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