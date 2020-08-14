const express = require("express")
const app = express()

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>")
})

app.get("/persons", (req, res) => {
  res.json(persons)
})

app.get("/info", (req, res) => {
  const numberOfPersons = persons.length
  const date = new Date()
  res.send(`
  <p>Phonebook has info for ${numberOfPersons} people</p>
  <p>${date}</p>
  `)
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})