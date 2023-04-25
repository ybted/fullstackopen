import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asanecdoteToChange = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asanecdoteToChange)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)
      
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : action.payload)  
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote({
      content: content,
      id: getId(),
      votes: 0
    }))
  }
}

export const voteForAnecdote = (anecdoteToChange) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const newAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch(updateAnecdote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer