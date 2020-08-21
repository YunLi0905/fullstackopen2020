require("dotenv").config()

const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")
app.use(cors())

app.use(express.json())
app.use(express.static("build"))

morgan.token("person", function(req) {
  console.log(JSON.stringify({ name: req.body.name, number: req.body.number }))
})

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person "
  )
)

//hello world
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>")
})

//get all people
app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

//get a person by id
// app.get("/api/persons/:id", (req, res) => {
//   console.log("id is:", req.params.id)
//   const id = Number(req.params.id)
//   const person = persons.find(person => person.id === id)
//   console.log("person is : ", person)

//   if (person) {
//     res.json(person)
//   } else {
//     res.status(404).end()
//   }
// })

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

//add a new person
app.post("/api/persons", (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: "The name is missing" })
  }

  if (!body.number) {
    return res.status(400).json({ error: "The number is missing" })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
