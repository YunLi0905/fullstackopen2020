import React from "react"
import Course from "./course"

const Header = ({ course }) => {
  return <h2>{course.name}</h2>
}

export default Header
