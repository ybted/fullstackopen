import { useState } from 'react'
import blogServices from '../services/blogs'
const Blog = ({ blog, setBlogs, blogs }) => {
  const [show, setShow] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggeleVisibility = () => {
    setShow(!show)
  }

  const updateBlog = (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    console.log('blog', blog)
    console.log('update...')
    blogServices.update(blog.id, newBlog)
      .then(blog => {
        console.log('update!')
        setBlogs(blogs.map(b => b.id === blog.id ? newBlog : b))
      })
      .catch(error => {
        console.log('something is wrong')
        console.log('error', error)
      })

  }

  const deleteBlog = (blog) => {
    console.log('delete...')
    blogServices.remove(blog.id)
      .then(blog => {
        console.log('delete!')
        setBlogs(blogs.filter(b => b.id !== blog.id))
      })
      .catch(error => {
        console.log('something is wrong during deleting')
        console.log(error)
      })
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggeleVisibility}>
        {show === false ?
          'view' :
          'hide'}
      </button>
      {show && <div>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={() => updateBlog(blog)}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={() => deleteBlog(blog)}>delete</button>
      </div>}
    </div>
  )
}

export default Blog