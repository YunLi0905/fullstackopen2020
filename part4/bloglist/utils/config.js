require("dotenv").config()

const PORT = process.env.PORT

console.log("port: ", PORT)

const MONGODB_URI = process.env.MONGODB_URI

console.log("mongoDB: ", MONGODB_URI)

module.exports = {
  MONGODB_URI,
  PORT
}
