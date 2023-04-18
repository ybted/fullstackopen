const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, cur) => sum + cur.likes,0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const blog = blogs.reduce((max, cur) => max.likes > cur.likes? max : cur, blogs[0])
  const returnedValue = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
  return returnedValue
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}