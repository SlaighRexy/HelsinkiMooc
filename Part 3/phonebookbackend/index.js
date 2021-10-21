const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const app = express()
app.use(morgan('tiny'))
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Persons = require('./models/phonebook')


app.get('/api/persons', (request, response) => {
  Persons.find({}).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  Persons.find({}).then(person => {
    const people = person.length
    response.send(`Phonebook has info for ${people} people <p> ${new Date().toUTCString()} </p>`)
  })

})

app.get('/api/persons/:id', (request, response, next) => {

  Persons.findById(request.params.id)
    .then(person => {

      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }

    })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
  Persons.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :body'))

app.post('/api/persons', (request, response, next) => {

  const body = request.body

  if(body.name === undefined){
    return response.status(400).json({ error: 'contact name missing' })
  }else{
    if(body.number === undefined){
      return response.status(400).json({ error: 'contact number missing' })
    }else{

      const foundPerson = Persons.findOne({ name: body.name })

      if(foundPerson === null){

        foundPerson.then(p => {

          const person = {
            name: p.name,
            number: body.number
          }

          Persons.findByIdAndUpdate(p.id, person, { new: true })
            .then(updatedPerson => {
              response.json(updatedPerson)
            })
            .catch(error => next(error))

        })


      }else{

        const person = new Persons( {

          name: body.name,
          number: body.number,

        } )

        person.save().then(savedPerson => {
          console.log(savedPerson)
          response.json(savedPerson)
        })
          .catch(error => next(error))


      }

    }
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  const opts = { runValidators: true }
  Persons.findByIdAndUpdate(request.params.id, person, opts, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

