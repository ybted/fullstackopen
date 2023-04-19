import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogServices from './services/blogs'
import loginServices from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogServices.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogServices.setToken(user.token)
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

  const addBlog = (blogObject) => {
    blogServices
      .create(blogObject)
      .then(res => {
        setBlogs(blogs.concat(res))
      })
  }
  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )
  const logoutForm = () => (
    <form onSubmit={() => {window.localStorage.removeItem('loggedBlogappUser')}}>
      <button type="submit">logout</button>
    </form>
  )

  const blogForm = () => (
    <>
      <h1>blogs</h1>
      {blogs.sort((a, b) => {
        return b.likes - a.likes
      }).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs}/>
      )
      }
    </>
  )

  const addBlogForm = () => (
    <Togglable buttonLabel="add blog">
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        {addBlogForm()}
        {blogForm()}
        {logoutForm()}
      </div>}
    </div>
  )
}

export default App