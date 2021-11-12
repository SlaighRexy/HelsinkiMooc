const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "This is the first blog post",
    author:"Jonathan Khan",
    url: "http://www.jonathankhan.com",
    likes: 2
  },
  {
    title: "This is the second blog post",
    author:"Bob Jane",
    url: "http://www.janebob.com",
    likes: 3
  }
]
 

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u)
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}