const express = require('express')
const morgan = require('morgan')
const app = express()
const logger = require('morgan')
const cors = require('cors')

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
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.json({
            error: "Person not found"
        })
        res.status(400).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people <p> <p>${new Date()}<p>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
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
    }  else if (persons.find(person => person.name === body.name) !== undefined) {
        return res.status(404).json({
            error: "name must be unique"
        })
}   
    const newPerson = {
        ...body,
        id: generateId()
    }
    persons = persons.concat(newPerson)
    res.send(persons)

})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)