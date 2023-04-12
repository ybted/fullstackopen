import Note from './components/Note'

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
        <li>
          <Note note={note} />
        </li>)}
      </ul>
    </div>
  )
}

export default App