import React from "react"
import Header from "./header"
import Content from "./content"
import Total from "./total"

const Courses = ({ courses }) => {
  console.log("Courses", courses)
  return (
    <div>
      <Header course={courses[0]} />
      <Content courses={courses[0]} />
      <Total parts={courses[0].parts} />

      <Header course={courses[1]} />

      <Content courses={courses[1]} />

      <Total parts={courses[1].parts} />
    </div>
  )
}

export default Courses
