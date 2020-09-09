// import React from "react"

// const Notification = ({ message }) => {
//   if (message === null) {
//     return null
//   }

//   return <div className="error">{message}</div>
// }

// export default Notification

import React from "react"

const Notification = ({ result, message }) => {
  console.log("success?", result)
  console.log("message: ", message)
  if (result) {
    return <div className="added">{message}</div>
  } else if (result === false) {
    return <div className="error">{message}</div>
  }
  return null
}

export default Notification
