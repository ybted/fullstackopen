import { useState } from 'react'
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const Button = ( {text,  handleclick} ) => 
  <button onClick={ () => {handleclick()}}>
    {text}
  </button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const set = () => {
    let temp = getRandomInt(anecdotes.length)
    while (temp === selected)
      temp = getRandomInt(anecdotes.length)
    
    setSelected(temp)
  }
  const vote = () => {
    const newAllvotes = [...votes]
    newAllvotes[selected] += 1
    setVotes(newAllvotes)
  }

  let max = votes.reduce((a, b) => Math.max(a, b))
  let index = 0 
  for (let i = 0; i < votes.length; i ++)
    if (max === votes[i])
      index = i    
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes.</p>
      <Button text="vote"  handleclick={vote}/>
      <Button text="next anecdote"  handleclick={set} />   
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
    </div>
  )
}

export default App