var _ = require('lodash');

const dummy = (blogs) => {     
    return 1
}

const totalLikes = (blogs) => {     
  return blogs.reduce((total, blog) => total + blog.likes,0)
}

const favoriteBlog = (blogs) => { 
  var bigLike = blogs.reduce((total, blog) => total >= blog.likes ? total : blog.likes, 0)
  const _filter = blogs.filter(blog =>  blog.likes === bigLike)
  .map(p =>({title: p.title, author: p.author, likes: p.likes}))
  
  return _filter
}


const mostBlogs = (blogs) => {
  
  try{
    // let docs = _.countBy(blogs,'author') 
    
    // console.log(docs)
     
          
    // return docs[0]
    let docs = blogs.aggregate([
      {
        $group: {
          // Each `_id` must be unique, so if there are multiple
          // documents with the same age, MongoDB will increment `count`.
          _id: '$author',
          count: { $sum: 1 }
        }
      }
    ]);
    
    docs.length; // 4
    docs.sort((d1, d2) => d1._id - d2._id);
    return docs[0];

  }catch(e) {
    console.log(e)
  }
}
  
module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog ,
    mostBlogs
}