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
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
	console.log(persons)
	
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
		const personObj = {name: trimmedNewName, number: newNumber}
		setPersons(persons.concat(personObj))
		setNewName('')
		setNewNumber('')
	}

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
				<div>number: <input value={newNumber} onChange={handleNumChange} /></div>
        <div><button type="submit" onClick={addPerson}>add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <Numbers key={person.name} person={person}/>)}
    </div>
  )
}

export default App