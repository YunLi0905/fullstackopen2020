import axios from "axios"

export const fetchCountries = () => {
  console.log("COUNTRIES : fetching data from external API")
  return axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      console.log("COUNTRIES : received response =", response)
      return response.data
    })
    .catch(error => {
      console.error("COUNTRIES : oops, something went wrong =", error)
      return []
    })
}

export const fetchWeather = location => {
  console.log("WEATHER : fetching data from external API")
  return axios
    .get(
      `http://api.weatherstack.com/forecast?access_key=${process.env.REACT_APP_API_KEY}&query=${location}`
    )
    .then(response => {
      console.log("WEATHER : received response =", response)
      const {
        temperature,
        weather_icons,
        wind_degree,
        wind_dir
      } = response.data.current
      return { temperature, weather_icons, wind_degree, wind_dir }
    })
    .catch(error => {
      console.error("WEATHER : oops, something went wrong =", error)
      return {}
    })
}
