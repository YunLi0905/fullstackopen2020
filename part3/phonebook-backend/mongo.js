const mongoose = require("mongoose")

export const connectToDatabase = () => {
  mongoose
    .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Now connected to MongoDb"))
    .catch(error =>
      console.error(
        "Something went wrong trying to connect to MongoDb =",
        error
      )
    )
}
