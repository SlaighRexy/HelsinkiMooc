import React from 'react';
import Weather from './Weather';

const CountryInfo = ({country}) => {
    return (
        <> 
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
        <h3>Languages</h3>
        <ul>
        {
          country.languages.map(country => 
              <li key={country.name}>{country.name}</li>
          )
        }
        </ul>
        <p>
            <img src={country.flag} alt="" width="200" height="100" />
        </p>
        <Weather country={country.name} />
        </>
    )
}

export default CountryInfo;