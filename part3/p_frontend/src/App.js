import { useState, useEffect } from 'react'
import Filter  from './components/Filter'
import { PersonForm, Persons } from './components/Persons'
import noteServices from './services/noteServices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    noteServices
      .getAll()
      .then(res => {
        setPersons(res)
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
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons
        .map(person => person.name)
        .find(name => name === newName) !== undefined) {
          const index = persons.map(person => person.name).indexOf(newName)
          const id = persons[index].id
          const nnewPerson = {...newPerson, id: id}
          console.log('index:', index)
          noteServices.update(id, nnewPerson)
            .then(res => {
              console.log('update successfully!')
              setPersons(
                persons.map(person => 
                  person.id === id ? 
                  nnewPerson : person))
            })
            .catch(res => {
              setErrorMessage(`Information of ${persons[index].name} has been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
          return 
        }
    
    noteServices
      .create(newPerson)
      .then(res => {
        setPersons(persons.concat(newPerson))
        setErrorMessage(`Added ${newPerson.name}`) 
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removePerson = (id) => {
    noteServices
      .remove(id)
      .then(res => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  let personsToShow = persons
    .filter(person => person.name.toLowerCase().indexOf(newFilter) !== -1)
  console.log('persons:', personsToShow)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        />
      <h2>Numbers</h2>
      <Persons 
        personsToShow={personsToShow} 
        removePerson={removePerson}
        />
    </div>
  )
}

export default App