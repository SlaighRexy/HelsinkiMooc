import React,{useState, useEffect} from 'react';
import Country from './components/Country';
import AllCountry from './components/CountryAll';
import CountryInfo from './components/CountryInfo';
import axios from 'axios';

const App = () => {
  const [allCountry, setAllCountry] = useState([])
  const [result, setResult] = useState([])
  const [country, setCountry] = useState('')

  

  const countries = () => {
    axios.get('https://restcountries.com/v2/all')
      .then(response => {
        const country = response.data
        setAllCountry(country) 
      })
  }
  useEffect(countries, [])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
    const search = allCountry.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setResult(search)
  }
 

  const showCountryDetails = (country) => {  
    const search = allCountry.filter(filter => filter.name === country) 
    setResult(search)
  }


  return (
    <>
      <div>
        find countries <input value={country} onChange={handleCountryChange} />
      </div>
      <ul>
        {
          result.length === 0 ?
            allCountry.map(country => 
              <AllCountry key={country.name}  country={country.name} />
            )
          :
            result.length === 1 ?
            <CountryInfo country= {result[0]} /> 
            : 
              result.length > 10 ? 
                <p>Too many matches, specify another filter</p> 
                : 
                result.map(country => 
                  <Country key={country.name}  country={country.name} showCountryDetails={showCountryDetails} />
                ) 
        }
      </ul>
    </>
  );
}

export default App;
