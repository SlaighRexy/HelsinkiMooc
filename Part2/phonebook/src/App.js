 import React, { useState, useEffect } from 'react'
 import Persons from './components/Persons'
 import PersonForm from './components/PersonForm'
 import Filter from './components/Filter'
 import phoneService from './services/phonebook' 
 import Notification from './components/Notification'
 import ErrorNotification from './components/ErrorNotification'
 import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('enter name to search...') 
  const [ result, setResult ] = useState([])
  const [ message, setMessage ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
 
  
  useEffect(() =>{

    phoneService.getAll()
      .then(result =>{
        setPersons(result)
      })

  },[])

  const addPhonebook  = (event) => {
    event.preventDefault();
     
    let addNewPerson = false
     
    persons.forEach( item => addNewPerson = item.name.toLowerCase() === newName.toLowerCase() )
    
    
    if(!addNewPerson) {   

      const phonebookObject = { 
        name: newName,
        number: newNumber
      };
  
      phoneService.create(phonebookObject)
      .then(result => {
        setPersons(persons.concat(result))        
        setNewName('')
        setNewNumber('')
        setResult([])
        setMessage(`Added ${newName}`)
      }) 

    }else{
      const cnf = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if(cnf){
        const filterPhoneBook = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())
        const changedNumber = { ...filterPhoneBook[0], number: newNumber }
        const id = filterPhoneBook[0]['id'] 
        
        phoneService.update(id, changedNumber).then(response =>{
          setPersons(persons.map(person => person.id !== id ? person : response))
        })
        .catch(error => { 
          setErrorMessage(`information of '${filterPhoneBook[0].name}' has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
      }
    }
     
  }
 

  const deletePerson = (id) =>{ 

    const personToRemove = persons.find(person => person.id === id)
     
    const message = window.confirm(`Delete ${personToRemove.name} from phonebook`)
    
    if(message) {
      phoneService.remove(id).then(response =>{
        setPersons(persons.map(person => person.id !== id ? person : response))
        setResult([]) 
      })
      .catch(error => {
        setErrorMessage(`information of '${personToRemove.name}' has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
        setResult([])
      })
    }
  }

  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => { 
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) =>{

    setNewSearch(event.target.value)
    if(event.target.value !== ''){
      const newFilter = persons.filter(person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
      if(newFilter.length > 0){
        setResult(newFilter)
      }
    }
    else{
      setResult([])
    }
    
  }  

  return ( 
       <div>
          <h2>Phonebook</h2>
          <Notification message={message} />
          <ErrorNotification message={errorMessage} />
          <Filter newSearch={newSearch} handleFilterChange={handleFilterChange} />

          <h3>Add a new</h3>

          <PersonForm addPhonebook={addPhonebook} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}  />

          <h3>Numbers</h3>
          
          {result.length > 0 ?
          result.map((person, i) =>
            <Persons key={i} name={person.name} number={person.number} 
              deletePerson={() =>  deletePerson(person.id)} />
          )
          :
            persons.map((person, i) =>
              <Persons key={i} name={person.name} number={person.number} 
                deletePerson={() =>  deletePerson(person.id)} />
            )
          }
    
        </div> 
  )
}

export default App; 
