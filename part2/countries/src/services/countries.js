import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

export const getAll = () => {
    const request = axios.get(`${baseUrl}all`)
    return request.then(response => response.data)
}

export const getOne = (name) => {
    const request = axios.get(`${baseUrl}name/${name}`)
    return request.then(response => response.data)
}
  

  