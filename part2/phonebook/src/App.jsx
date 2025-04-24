import { useState } from 'react'

const Numbers = ({ person }) => {
	return (
		<div>
			<p>{person.name}</p>
		</div>
	)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
	console.log(persons)
	
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()
		const trimmedNewName = newName.trim()
		if (persons.find((p) => trimmedNewName === p.name))
		{
			alert(`${trimmedNewName} is already added to phonebook`)
			return;
		}
		const personObj = {name: trimmedNewName}
		setPersons(persons.concat(personObj))
		setNewName('')
	}

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <Numbers key={person.name} person={person}/>)}
    </div>
  )
}

export default App