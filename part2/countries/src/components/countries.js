import React from "react"
import Country from "./country"

const Countries = props => {
  const showCountries = props.countries.filter(country =>
    country.name.toLowerCase().includes(props.searchTerm)
  )
  console.log("show countries", showCountries)

  if (showCountries.length > 10) {
    return <p>Too many matches, specify another filer</p>
  } else if (showCountries.length > 1) {
    return (
      <div>
        {showCountries.map(({ name }) => (
          <ul key={name}>{name}</ul>
        ))}
      </div>
    )
  } else if (showCountries.length === 1) {
    return <Country country={showCountries[0]} />
  }
  return null
}

export default Countries
