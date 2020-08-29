require("dotenv").config()

const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")
app.use(cors())

app.use(express.static("build"))
app.use(express.json())

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

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

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

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

//add a new person
app.post("/api/persons", (req, res, next) => {
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

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

//delete a person by id
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

//get info
app.get("/api/info", (req, res) => {
  // const numberOfPersons = persons.length
  // const date = new Date()
  // res.send(`
  // <p>Phonebook has info for ${numberOfPersons} people</p>
  // <p>${date}</p>
  // `)
  Person.find({}).then(persons => {
    const numberOfPersons = persons.length
    const date = new Date()
    res.send(`<p>Phonebook has info for ${numberOfPersons} people</p>
  <p>${date}</p>`)
  })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
