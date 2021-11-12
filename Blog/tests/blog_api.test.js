const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const middleware = require('../utils/middleware')


const api = supertest(app)
const Blog = require('../models/blogs') 
 
var loggedInToken = '';
 

beforeEach(async () => {
     
    
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let newBlogObject = new Blog(blog)
      await newBlogObject.save()
    }
}, 500000)
describe('viewing of blog', () => {
    test('where all blogs are returned', async () => {
        const response = await api.get('/api/blogs') 
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('by verifying the existence of blog id property', async () => {

        const blogs = await helper.blogsInDb() 
        
        expect(blogs[0].id).toBeDefined()
    })

    test('by author with most blog', async () => {
        const blogs = await helper.blogsInDb() 
        
        const result = helper.mostBlogs(blogs) 

        expect(result.length).toBe(1)
      })
})
  
describe('addition of a new blog', () => {
    test('successfully created a new blog post', async () => {
   
        const newBlogObject = {
            title: 'Making a new http blog post',
            author:"Bob Kane",
            url: "http://www.bobkane.com",
            likes: 1,
            userId: '61827b9f14950989fc116fd8',
        }
        
        await api.post('/api/blogs')
        .send(newBlogObject)        
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjE4MTM0MjU5MmRkOTFkYWRlNzM1ZmI3IiwiaWF0IjoxNjM2NTUwMTg5fQ.U3Q7SpQJIXyvn8Gi4ytfv649jJTl991IzZBVfovhHrU')
        .expect(200) 
        .expect('Content-Type', /application\/json/)
        
        const blogsFromDb = await helper.blogsInDb()
        expect(blogsFromDb).toHaveLength(helper.initialBlogs.length + 1)

        const title = blogsFromDb.map(t => t.title)
        expect(title).toContain('Making a new http blog post')
        
    })

    test('defaulted likes to zero', async () => {
 
        const newBlogObject = {
            title: 'Auto set likes to zero',
            author:"Bob Kane",
            url: "http://www.bobkane.com" ,
            userId: '61827b9f14950989fc116fd8'
        }
        
        await api.post('/api/blogs')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjE4MTM0MjU5MmRkOTFkYWRlNzM1ZmI3IiwiaWF0IjoxNjM2NTUwMTg5fQ.U3Q7SpQJIXyvn8Gi4ytfv649jJTl991IzZBVfovhHrU')
        .send(newBlogObject)
        .expect(200) 
        
        const blogs = await helper.blogsInDb() 
        expect(blogs[2].likes).toBe(0)
        
    })

    test('where title/url is/are missing', async () => {
 
        const newBlogObject = { 
            author:"Bob Kane",
            likes: 1,
            userId: '61827b9f14950989fc116fd8',
        }
        
        await api.post('/api/blogs')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjE4MTM0MjU5MmRkOTFkYWRlNzM1ZmI3IiwiaWF0IjoxNjM2NTUwMTg5fQ.U3Q7SpQJIXyvn8Gi4ytfv649jJTl991IzZBVfovhHrU')
        .send(newBlogObject)
        .expect(400)  
        
    })
})
  
describe('deletion of a blog', () => {
    test('succeeds with status code 204 for a valid blog id', async () => {

      const blogsBeforeDelete = await helper.blogsInDb()
      const blogToDelete = blogsBeforeDelete[0]
      
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjE4MTM0MjU5MmRkOTFkYWRlNzM1ZmI3IiwiaWF0IjoxNjM2NTUwMTg5fQ.U3Q7SpQJIXyvn8Gi4ytfv649jJTl991IzZBVfovhHrU')
        .expect(204)
  
      const blogsAfterDelete = await helper.blogsInDb()
      
      expect(blogsAfterDelete).toHaveLength( helper.initialBlogs.length - 1 )
  
      const title = blogsAfterDelete.map(r => r.title)
  
      expect(title).not.toContain(blogToDelete.title)
    })
})

describe('updating likes of a blog', () => {
    test('succeeds with status code 200 for a valid blog id', async () => {

      const blogs = await helper.blogsInDb()
      const blogToUpdate = blogs[0]

      const updateLikes = {
        likes: 30
      }
      
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateLikes)
        .expect(200)
  
      const blogsAfterUpdate = await helper.blogsInDb() 
      
      const likes = blogsAfterUpdate[0].likes
  
      expect(likes).toBe(30)
    })
})


describe('creatiang a new blog', () => {
    test('by assigning a user to the new blog', async () => {

        const blogsAtStart = await helper.blogsInDb()
  
        const newBlog = { 
            title: 'Assigning a new blog to a user',
            author:"Jack Dorsey Hack",
            url: "http://www.jackdorsey.com",
            likes: 1,
            userId: '61827b9f14950989fc116fd8'
        }
      
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjE4MTM0MjU5MmRkOTFkYWRlNzM1ZmI3IiwiaWF0IjoxNjM2NTUwMTg5fQ.U3Q7SpQJIXyvn8Gi4ytfv649jJTl991IzZBVfovhHrU')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/) 

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1) 
        
    })
})

afterAll(() => {
    mongoose.connection.close()
})