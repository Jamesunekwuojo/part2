import { useState, } from 'react'
import './App.css';
import axios from 'axios';

const CountryList = ({filteredCountries}) => {

  if(filteredCountries > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (filteredCountries == 1) {
    return filteredCountries.map(country =>{
      return (
        <div>
          {country.name}
          {country.capital}
          {country.flags}
        </div>
      )
    } )
  
    
  }

  return(
    <div>
      {filteredCountries.map((country) => {
        <li>
          {country.name}
        </li>
      })}
    </div>
  )

}

function App() {

  // const [countryName, setCountryName] = useState(null)
  const [countries, setCountries] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {

    setSearchTerm(e.target.value)

  }



  

  const handleRequest = () => {
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'


    // Get data from REST API
    axios.get(url)
    .then((response) => {
      
      console.log(response)

      setCountries(response.data)
       
    
    })
    .catch((error) => {
      console.log(error)

    })


    
  

  }

  const filteredCountries = countries.filter((country) =>  country.name.toLowerCase().includes(searchTerm.toLowerCase()))




  return (
    <>
    <div className='searchDiv'>
      <p>find countries</p>
      <input value={searchTerm} onChange={handleChange} className='searchInput' type="text" />
    </div>

    {/* Countrylists */}
    <CountryList filteredCountries={filteredCountries}></CountryList>

  
    </>
  )
 
}

export default App
