import React, { useState, useEffect } from "react"
import Persons from "./components/persons"
import Filter from "./components/filter"
import PersonForm from "./components/personForm"
import Notification from "./components/notification"

import personService from "./services/personService"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [result, setResult] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    console.log("initialPersons")
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  console.log(persons)

  const handleNameChange = event => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()

    if (persons.filter(person => person.name === newName).length > 0) {
      const person = persons.find(p => p.name === newName)
      console.log("person: ", person)
      const resultConfirmed = window.confirm(
        newName +
          " is already added to phonebook,replace the old number with a new one?"
      )

      if (resultConfirmed) {
        const personObject = {
          name: newName,
          number: newNumber
        }
        setNewPerson(personObject)
        personService.updatePerson(person.id, personObject)

        setPersons(
          persons.map(p => {
            if (p.id !== person.id) {
              return p
            }
            return { ...p, number: newNumber }
          })
        )
      }
      setNewName("")
      setNewNumber("")
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setNewPerson(personObject)

      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setResult(true)
          setMessage("Added " + personObject.name)
        })
        .catch(error => {
          setMessage(error.message)

          setResult(false)
        })
    }
    setTimeout(() => {
      setMessage("")
      setResult("")
      setNewPerson("")
    }, 2000)
  }

  const handleDeletePerson = id => {
    console.log("handleDeletePerson called with id =", id)
    const person = persons.find(p => p.id === id)
    personService.getOne(id).then(personInDb => {
      if (!personInDb) {
        setPersons(persons.filter(p => p.id !== id))
        setResult(false)
        setMessage(
          "Information of " +
            person.name +
            " has already been removed from server"
        )
        setTimeout(() => {
          setResult("")
          setMessage("")
        }, 2000)
      } else {
        const resultConfirmed = window.confirm(`Delete ${person.name}?`)
        if (resultConfirmed) {
          personService.deletePerson(id, person)
          setPersons(persons.filter(p => p.id !== id))
          setResult(true)
          setMessage(person.name + " has been removed successfully ")
          setTimeout(() => {
            setResult("")
            setMessage(" ")
          }, 2000)
        }
      }
    })
  }

  const handleSearch = event => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  console.log("new person", newPerson)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification result={result} message={message} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        handleClick={handleDeletePerson}
      />
    </div>
  )
}

export default App
