import React from "react"
import Person from "./person"

const Persons = props => {
  return (
    <ul>
      {props.persons
        .filter(person => person.name.toLowerCase().includes(props.searchTerm))
        .map(person => (
          <Person
            key={person.id}
            person={person}
            handleClick={() => props.handleClick(person.id)}
          />
        ))}
    </ul>
  )
}

export default Persons
