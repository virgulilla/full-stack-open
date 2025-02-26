import { useState, useEffect } from 'react'
import { getWeather } from "../services/weather"

const Country = ({ country }) => {
    if (!country) return null

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (!country || !country.capital || country.capital.length === 0) return

        let isMounted = true // Variable para evitar actualizaciones de estado en componentes desmontados

        getWeather(country.capital[0])
            .then((response) => {
                if (isMounted) { // Solo actualizar estado si el componente sigue montado
                    setWeather({
                        temp: response.main.temp,
                        windSpeed: response.wind.speed,
                        weatherIcon: response.weather[0].icon
                    })
                }
            })
            .catch(() => {
                if (isMounted) setWeather(null)
            })

        return () => {
            isMounted = false // Cleanup: Evita actualizaciones de estado en componentes desmontados
        }
    }, [country?.capital?.[0]])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital?.[0]}</p>
            <p>Area: {country.area}</p>
            <h3>Languages</h3>
            <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
            <img src={country.flags?.png} alt={`Flag of ${country.name.common}`} width="150" />
            
            {weather && (
                <div>
                    <h3>Weather in {country.capital[0]}</h3>
                    <p>Temperature {Math.round(weather.temp - 273.15)} Celsius</p> 
                    <img src={`https://openweathermap.org/img/wn/${weather.weatherIcon}@2x.png`} alt="Weather icon" />
                    <p>Wind {weather.windSpeed} m/s</p>                    
                </div>
            )}
        </div>
    )
}

const CountryList = ({ manyCountries, countries, country, handleShowContry }) => {
    return (
        <>
            {manyCountries && <p>{manyCountries}</p>}
            {countries.length > 0 && (
                <ul>
                    {countries.map((country) => (
                        <li key={country.ccn3}>
                            {country.name.common}
                            <button onClick={() => handleShowContry(country.name.common)}>Show</button>
                        </li>                    
                    ))}
                </ul>
            )}
            <Country country={country} />
        </>        
    )
}

export default CountryList
