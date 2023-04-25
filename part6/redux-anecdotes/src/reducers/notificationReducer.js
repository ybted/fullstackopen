import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      console.log('acton', action.payload)
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export const addSucessNotification = (content) => {
  return async dispatch => {
    dispatch(setNotification(`new anecdote '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const voteSucessNotificaton = (anecdote) => {
  return async dispatch => {
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    },5000)
  }
}

export default notificationSlice.reducer