import React, { useState, useEffect } from "react"

import Filter from "./components/filter"
import Countries from "./components/countries"
import { fetchCountries } from "./api"

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = event => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    console.log("App useEffect")
    fetchCountries().then(setCountries)
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
