import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteServices  from './services/notes'
import loginServices from './services/login'

const Notification = ( {message} ) => {
  if (message === null)
    return null
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteServices
      .getAll()
      .then(res => {
        console.log('promise fulfilled')
        setNotes(res)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteServices.setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteServices
      .update(id, changedNote)
      .then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response))
    })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: Math.floor(Math.random() * 100)
    }
    noteServices
      .create(noteObject)
      .then(res => {
        setNotes(notes.concat(res))
        setNewNote('')
      })
    
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginServices.login({
        username, password
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input 
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input 
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>   
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={() => {window.localStorage.removeItem('loggedNoteappUser')}}>
      <button type="submit">logout</button>
    </form>
  )
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      
      {!user && loginForm()}
      {user && <div>
          <p>{user.name} logged in</p>
            {noteForm()}
            {logoutForm()}
        </div> 
        
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      
    </div>
  )
}

export default App