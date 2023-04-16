const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)

test('blogs are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('like-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are defined by id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'fullstackopen',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/en/#course-likes',
    likes: 19323
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('like-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogsAtEnd.map(n => n.title)
  expect(likes).toContain(
    'fullstackopen'
  )
})

test('a url and a title is needed', async () => {
  const newBlog = {
    title: 'fullstackopen',
    author: 'Matti Luukkainen',
    likes: 19323
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a 0 is set when likes is missing', async () => {
  const newBlog = {
    title: 'fullstack',
    author: 'Matti',
    url: 'https://fullstackopen.com/en/#course-likes',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('like-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.find(blog => blog.title === 'fullstack')
  expect(blog.likes).toBe(0)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updation of a blog', () => {
  test('update blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedblog = {
      ...blogToUpdate,
      likes: 912312,
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedblog)
    const blogdAtEnd = await helper.blogsInDb()
    const likes = blogdAtEnd.map(blog => blog.likes)
    expect(likes).toContain(updatedblog.likes)

  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
