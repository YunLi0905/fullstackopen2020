import React, { useState } from "react"
import Persons from "./components/persons"
import Filter from "./components/filter"
import PersonForm from "./components/personForm"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

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
