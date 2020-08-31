require("dotenv").config()

const PORT = process.env.PORT

console.log("port: ", PORT)

let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

console.log("mongoDB: ", MONGODB_URI)

module.exports = {
  MONGODB_URI,
  PORT
}
