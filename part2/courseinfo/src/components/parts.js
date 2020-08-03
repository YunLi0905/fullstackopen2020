import React from "react"
import Part from "./part"

const Parts = ({ parts }) => {
  console.log("parts: ", parts)

  return parts.map(part => {
    return <Part key={part.id} part={part} />
  })
}
export default Parts
