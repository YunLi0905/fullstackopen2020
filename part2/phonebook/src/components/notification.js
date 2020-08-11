import React from "react"

const Notification = ({ result, name }) => {
  console.log("success?", result)
  console.log("name?", name)
  if (result) {
    return <div className="added">Added {name}</div>
  } else {
    return null
  }
}

export default Notification
