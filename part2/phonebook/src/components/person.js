import React from "react"

const Person = ({ person, handleClick }) => {
  return (
    <p>
      {person.name} {person.number}
      {"  "}
      <button onClick={handleClick}>Delete</button>
    </p>
  )
}

export default Person
