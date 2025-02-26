import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_KEY
const baseUrl =`https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=`

export const getWeather = (name) => {
    const request = axios.get(`${baseUrl}${name}`)
    return request.then(response => response.data)
}
  

  