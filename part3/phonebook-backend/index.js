const express = require("express")
const app = express()

app.use(express.json())
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

app.get("/persons/:id", (req, res) => {
  console.log("id is:", req.params.id)
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  console.log("person is : ", person)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const generatedId = () => {
  return Math.floor(Math.random() * 10000)
}

app.post("/persons", (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: "The name is missing" })
  }

  if (!body.number) {
    return res.status(400).json({ error: "The number is missing" })
  }

  if (persons.filter(person => person.name === body.name).length > 0) {
    const person = persons.find(p => p.name === body.name)
    console.log("person: ", person)
    return res.status(400).json({ error: "name must be unique" })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generatedId()
  }

  persons = persons.concat(person)
  res.json(person)
})

app.delete("/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
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
