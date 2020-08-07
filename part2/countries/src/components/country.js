import React from "react"
import Weather from "./weather"

const Country = props => {
  return (
    <div>
      <h2>{props.country.name}</h2>

      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {props.country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={props.country.flag} width="260" height="145" alt="Flag" />

      <Weather location={props.country.capital} />
    </div>
  )
}

export default Country
