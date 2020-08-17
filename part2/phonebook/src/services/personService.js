import axios from "axios"

const baseUrl = "/api/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log("request", request)
  return request
    .then(res => res.data)
    .catch(error => {
      console.log("fail", error)
    })
}

const getOne = id => {
  const request = axios.get(`${baseUrl}/${id}`)
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

const deletePerson = (id, person) => {
  const request = axios.delete(`${baseUrl}/${id}`, person)
  return request.then(res => res.data)
}

export default {
  getAll,
  getOne,
  createPerson,
  updatePerson,
  deletePerson
}
