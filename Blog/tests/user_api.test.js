const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  }, 5000000)

   
  test('creation fails if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

describe('validating new users when', () => {
    test('username or password is missing', async () => { 

        const newUser = { 
          name: 'Matti Luukkainen',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
 
     
        expect(result.body.error).toContain('username or password missing')
     
    }) 

    test('username or password lenght is less than 3', async () => { 

        const newUser = { 
          username: 'bob',
          name: 'Bob Jacob',
          password: 'sa',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/) 
     
        expect(result.body.error).toContain('password must be at least 3 characters')
     
    }) 
})


afterAll(() => {
  mongoose.connection.close()
})