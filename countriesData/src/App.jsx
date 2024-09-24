import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const CountryList = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    const languages = Object.entries(country.languages).map(([code, language]) => (
      <li key={code}>{language}</li>
    ))

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>area{country.area}</p>
        <h3>Languages:</h3>
        <ul>{languages}</ul>
        <img className='countryFlag' src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      </div>
    );
  }

  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.cca2}>
          {country.name.common}
        </li>
      ))}
    </ul>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleRequest = async () => {
      const url = 'https://studies.cs.helsinki.fi/restcountries/api/all';
      try {
        const response = await axios.get(url);
        setCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleRequest();
  }, []);

  const filteredCountries = countries.filter((country) => {
    return (
      typeof country.name?.common === 'string' &&
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className='searchDiv'>
        <p>find countries</p>
        <input value={searchTerm} onChange={handleChange} className='searchInput' type="text" />
      </div>

      {/* CountryLists */}
      <CountryList filteredCountries={filteredCountries} />
    </>
  );
}

export default App;
