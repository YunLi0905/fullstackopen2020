import React from "react"
import Header from "./header"
import Content from "./content"

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

export default Course
