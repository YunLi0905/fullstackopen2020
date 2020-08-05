import React, { useState, useEffect } from "react"
import Persons from "./components/persons"
import Filter from "./components/filter"
import PersonForm from "./components/personForm"

import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    console.log("effect")
    axios.get("http://localhost:3001/persons").then(response => {
      console.log("persons")
      setPersons(response.data)
    })
  }, [])
  console.log("render", persons.length, "persons")

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
      alert(newName + " is already added to phonebook")
      setNewName("")
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleSearch = event => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App
