import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogServices from './services/blogs'
import loginServices from './services/login'

const Notification = ( {message} ) => {
  if (message === null)
    return null
  if (message.indexOf('Cannot') !== -1)
    return (
      <div className='error'>
        {message}
      </div>
    )
  else 
      return (
        <div className='success'>
          {message}
        </div>
      )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const res = await blogServices.create(blogObject)
      setErrorMessage(`Added blog ${blogObject.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
      setBlogs(blogs.concat(res))
      setAuthor('')
      setUrl('')
      setTitle('')
    } catch (exception) {
      setErrorMessage(`Cannot add blog ${blogObject.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const loginForm = () => (
    <>
      <h1>log in to application</h1>
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
    </>
  )
  const logoutForm = () => (
    <form onSubmit={() => {window.localStorage.removeItem('loggedBlogappUser')}}>
      <button type="submit">logout</button>
    </form>
  )
  
  const blogForm = () => (
    <>
      <h1>blogs</h1>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const addBlogForm = () => (
    <>
      <h1>create New</h1>
      <form onSubmit={addBlog}>
        <div>
          title:<input value={title} onChange={({target}) => setTitle(target.value)}/>
        </div> 
        <div>
          author:<input value={author} onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
          url: <input value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">add blog</button>
      </form>
    </>
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