import React, { useState, useEffect } from "react"
import axios from "axios"

import Filter from "./components/filter"
import Countries from "./components/countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = event => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    console.log("effect")
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log("Countries")
      setCountries(response.data)
    })
  }, [])
  console.log("render", countries.length, "countries")
  console.log(countries)
  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Countries
        countries={countries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default App
