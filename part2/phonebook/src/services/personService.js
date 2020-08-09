import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log("request", request)
  return request
    .then(res => res.data)
    .catch(error => {
      console.log("fail", error)
    })
}

const createPerson = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(res => res.data)
}

const updatePerson = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(res => res.data)
}

export default {
  getAll,
  createPerson,
  updatePerson
}
