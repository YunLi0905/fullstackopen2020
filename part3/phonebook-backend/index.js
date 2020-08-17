const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
app.use(cors())

app.use(express.json())

morgan.token("person", function(req) {
  console.log(JSON.stringify({ name: req.body.name, number: req.body.number }))
})

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person "
  )
)

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

//hello world
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>")
})

//get all people
app.get("/api/persons", (req, res) => {
  res.json(persons)
})

//get a person by id
app.get("/api/persons/:id", (req, res) => {
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

//add a new person
app.post("/api/persons", (req, res) => {
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

//delete a person by id
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

//get info
app.get("/api/info", (req, res) => {
  const numberOfPersons = persons.length
  const date = new Date()
  res.send(`
  <p>Phonebook has info for ${numberOfPersons} people</p>
  <p>${date}</p>
  `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
