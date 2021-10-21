const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.PHONE_BOOK_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneBookSchema = new mongoose.Schema({
  // eslint-disable-next-line no-dupe-keys
  name: { type: String, required: true, uniqueCaseInsensitive: true, minLength: 3, unique: true, uniqueCaseInsensitive: true },
  number: { type: String, required: true, unique: true, minLength: 8 }
})
phoneBookSchema.plugin(uniqueValidator)

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', phoneBookSchema)