import React from "react"
import Header from "./header"
import Content from "./content"
import Total from "./total"

const Course = ({ course }) => {
  console.log("Course", course)
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
