import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { getAll, create, update, deletePerson } from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])
  

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(({ name }) => name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        update(existingPerson.id, {...existingPerson, phone: newPhone})
        .then(returnedPerson  => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : returnedPerson
          ));
          printMessage('success', `Changed phone of ${newName}`)
        })  
      }
    } else {
      const personObject = {
        name: newName, 
        phone: newPhone
      }
      create(personObject)
        .then(returnedPerson  => {
          setPersons([...persons, returnedPerson])
          printMessage('success', `Added ${newName}`)
        })    
    }
  }

  const printMessage = (type, message)  => {
    setMessage(message)
    setTypeMessage(type)
    setTimeout(() => {
      setMessage(null)
      setTypeMessage(null)
    }, 5000)
  }

  const handleDeleteClick = (id, name) => {    
    if (window.confirm(`Delete ${name} ?`)) {
      deletePerson(id)
        .then(()  => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error("Cannot delete this person", error);
        });   
    }
  }

  const personsToShow = filter
  ? persons.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    )
  : persons


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type={typeMessage} message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}/>
      
      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} handleDeleteClick={handleDeleteClick} />
    </div>
  )
}

export default App