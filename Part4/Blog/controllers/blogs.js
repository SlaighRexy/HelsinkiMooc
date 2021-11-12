const blogRouter = require('express').Router() 
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
var _ = require('lodash')
const middleware = require('../utils/middleware')

 
blogRouter.get('/', async (_request, response) => {
    
    const blog = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
     
    response.json(blog)
    
})


blogRouter.get('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    if (note) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  
})

blogRouter.delete('/:id', async (request, response) => {

    var token = request.token 
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user

    const blog = await Blog.findById(request.params.id)
 
    if(blog.user.toString() === user._id.toString()) {

      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end() 
      
    }
    else{
        response.status(401).end()
    }

   
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
        likes: body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
    response.json(updatedBlog)
  
})


blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body  
    var token = request.token 
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
  
    if(body.title === undefined && body.url === undefined) {
        response.status(400).end()
    }
     
    const blog = new Blog(
        {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id 
        }   
    )

    const savedBlog = await blog.save() 

    const _blogIds = { blogs: user.blogs.concat( savedBlog._id ) }
    await User.findByIdAndUpdate( user._id , _blogIds , { lean: true, upsert: true, new: true })

    response.json(savedBlog)
     
})

module.exports = blogRouter