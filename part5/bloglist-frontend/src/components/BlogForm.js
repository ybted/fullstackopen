import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogObject = {
    title: title,
    author: author,
    url: url
  }
  const addBlog = (event) => {
    event.preventDefault()
    createBlog(blogObject)
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:<input value={title} onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author:<input value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url: <input value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  )
}

export default BlogForm