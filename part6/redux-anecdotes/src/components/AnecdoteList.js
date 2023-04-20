import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
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
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const vote = (id) => {
    console.log('vote', id)
    return voteForAnecdote(id)
  }

  return (
    anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => 
      <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => 
          dispatch(vote(anecdote.id))}
      />
    )
  )
}

export default AnecdoteList