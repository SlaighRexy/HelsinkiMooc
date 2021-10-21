const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

const url = `mongodb+srv://sylvesterameh01:${password}@cluster0.nkbbr.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String, 
})

const Persons = mongoose.model('Person', personSchema)

const person = new Persons({
  name: name,
  number: phone, 
})

if (process.argv.length > 3) {
  if(name !== undefined && phone !== undefined) {
    person.save().then(result => {
      console.log(`added ${name} number ${phone} to phonebook`)
      mongoose.connection.close()
    })
  } 
  
}

if (process.argv.length === 3) {
    Persons.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)

        })
        mongoose.connection.close()
    })
}

