import { useState, useEffect } from 'react'
import Filter  from './components/Filter'
import { PersonForm, Persons } from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  },[])

  const handleNameChange = (event) => {
    console.log(newName)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(newNumber)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(newFilter)
    setNewFilter(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (persons
        .map(person => person.name)
        .find(name => name === newName) !== undefined) {
          alert(`${newName} is already added to phonebook.`)
          return 
        }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
  }

  let personsToShow = persons
    .filter(person => person.name.toLowerCase().indexOf(newFilter) !== -1)
  console.log('persons:', personsToShow)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App