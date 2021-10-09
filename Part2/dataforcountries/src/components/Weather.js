import React, {useEffect, useState} from 'react'
import ShowWeather from './ShowWeather'
import axios from 'axios'

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])  
    const [watherCountry, setWatherCountry] = useState(country) 
     

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY         
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${watherCountry}`

        const fetchData = async () => {
            try {
                axios.get(url)
                .then(response => {
                    const weather_data = response.data
                    setWeather(weather_data) ;
                })     
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [watherCountry]); 

   return(
      <>
        <h1>Weather in {country}</h1>
        
        {
            weather.length !== 0 ?             
                <ShowWeather weather={weather} />
            : 
                console.log('0 lenght')
        }
        
      </>
   )
      
}

export default Weather