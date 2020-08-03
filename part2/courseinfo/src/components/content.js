import React from "react"
import Parts from "./parts"

const Content = ({ course }) => {
  console.log("content", course)
  return (
    <div>
      <Parts parts={course.parts} />
    </div>
  )
}

export default Content
