import React from "react"

const Part = ({ part }) => {
  console.log("part: ", part)
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

export default Part
