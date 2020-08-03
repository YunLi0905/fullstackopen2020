import React from "react"
import Parts from "./parts"

const Content = ({ courses }) => {
  console.log("content", courses)
  return (
    <div>
      <Parts parts={courses.parts} />
    </div>
  )
}

export default Content
