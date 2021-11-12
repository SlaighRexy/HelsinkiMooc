require('dotenv').config()

const BLOG_URI = process.env.NODE_ENV === 'test'
? process.env.TEST_BLOG_URI
: process.env.BLOG_URI

const PORT = process.env.PORT

module.exports ={
    BLOG_URI,
    PORT
}