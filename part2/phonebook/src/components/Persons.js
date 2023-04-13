const PersonForm = ( {addPerson, handleNameChange, handleNumberChange} ) => {
    return (
      <form onSubmit={addPerson}>
          <div>
            name: <input 
              onChange={handleNameChange}
              />
          </div>
          <div>
            number: <input 
              onChange={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }
  
  const Persons = ( {personsToShow, removePerson} ) => {
    return (
      <ul>
        {personsToShow.map(
          person => 
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => {removePerson(person.id)}}>
              delete
            </button>
          </li>
        )}
      </ul>
    )
  }

  export {PersonForm, Persons}