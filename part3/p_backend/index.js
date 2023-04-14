require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const logger = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')
const { request } = require('express')
const person = require('./modules/person')
const generateId = () => {
  return Math.floor(Math.random() * 1000)
}

const requestLogger = (req, res, next) => {
  console.log('Method', req.method)
  console.log('Path', req.path)
  console.log('Body', req.body)
  console.log('---')
  next()
}
const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}
const log = logger((tokens, req, res) => {
  if (tokens.method(req, res) === "POST")
  return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
  ].join(' ')
  else 
  return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
  ].join(' ')
})
app.use(express.json())
app.use(log)
app.use(cors())
app.use(express.static('build'))

app.get('/info', (req, res) => {
  Person.find({}).then(result => {
    res.send(`<p>This phonebook has ${result.length} persons.</p><p>${new Date()}</p>`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person =>{
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.number) {
        return res.status(404).json({
            error: "number missing"
        }) 
    } else if(!body.name) {
        return res.status(404).json({
            error: "name missing"
        })
    }    
    const newPerson = new Person({
        ...body
    })
    newPerson.save().then(savedNote => {
      res.json(savedNote)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
const PORT = 3001
app.listen(PORT)