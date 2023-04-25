import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { voteSucessNotificaton } from "../reducers/notificationReducer"
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
  </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const temp = [...anecdotes]
  const handleClick = (anecdote) => {
    dispatch(voteForAnecdote({...anecdote}))
    dispatch(voteSucessNotificaton({...anecdote}))
  }
  return (
    temp.sort((a, b) => b.votes - a.votes).map(anecdote => 
      <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => handleClick(anecdote)}
          
      />
    )
  )
}

export default AnecdoteList