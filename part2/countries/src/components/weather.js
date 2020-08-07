import React, { useEffect, useState } from "react"
import { fetchWeather } from "../api"

const Weather = ({ location }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    console.log("Weather useEffect")
    fetchWeather(location).then(setWeather)
  }, [location])

  console.log("weather", weather)
  if (!weather) {
    return null
  }
  return (
    <div>
      <h3>Weather in {location}</h3>

      <p>temperature: {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} alt="weather icon" />

      <p>
        wind: {weather.wind_degree} mph direction {weather.wind_dir}
      </p>
    </div>
  )
}

export default Weather
