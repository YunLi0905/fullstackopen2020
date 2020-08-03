import React from "react"

const Total = ({ parts }) => {
  const total = parts.reduce(function(sum, part) {
    return sum + part.exercises
  }, 0)
  return (
    <div>
      <h4>total of {total} exercises</h4>
    </div>
  )
}

export default Total
