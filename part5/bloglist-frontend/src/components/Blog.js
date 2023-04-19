import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = (props) => {
  const blog = props.blog
  const [show, setShow] = useState(false)
  const showWhenVisible = { display: show ? '' : 'none' }

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

  const increaseLikes = async () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    await props.updateBlog(updatedBlog)
  }


  const removeBlog = () => props.deleteBlog(blog)

  return (
    <div style={blogStyle} className='blogContent'>
      <div>{blog.title} - {blog.author}
        <button onClick={toggeleVisibility}>
          {show === false ?
            'view' :
            'hide'}
        </button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button id='like-button' onClick={increaseLikes}>like</button></p>
        <button id='remove' onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog