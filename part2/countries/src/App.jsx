import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import { getAll, getOne } from './services/countries'
import CountryList from './components/CountryList'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [manyCountries, setManyCountries] = useState('')

  useEffect( () => {
    getAll(filter)
      .then((response)  => {
        if (filter.trim() === '') {
          setCountries([])
        } else {
          const filteredCountries = response.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
          
          if (filteredCountries.length > 10) {
            setManyCountries('Too many matches, specify another filter')
            setCountries([])
            setCountry(null)
          } else if(filteredCountries.length > 1) {
            setCountries(filteredCountries)
            setCountry(null)
            setManyCountries('')
          } else if(filteredCountries.length === 1) {
            setCountries([])
            setManyCountries('')
            const countryName = filteredCountries[0]?.name?.common
            if (!countryName) {
              setCountry(null)
              return
            }
            getOne(countryName)
              .then((country) => {
                setCountry(country)              
              })
              .catch(() => {
                setCountry(null)
                setManyCountries('No country found')
              })                        
          } else {
            setCountries([])
            setCountry(null)
            setManyCountries('No country found')
          }
        }
      })
  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowContry = (name) => {
    setFilter(name)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}  />
      <CountryList manyCountries={manyCountries} countries={countries} country={country} handleShowContry={handleShowContry} />
      
    </div>
  )
}

export default App
