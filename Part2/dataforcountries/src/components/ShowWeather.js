import React from "react";

const Temperature = ({weather}) => {
    return (
        <>
          <p> <b>Temperature:</b> {weather} Celsius </p>
        </>
    )
}

const Icon = ({icon}) => {
    return (
        <>
            <p> <img src={icon[0]} alt='weather icon' /> </p>
        </>
    )
}

const Wind = ({wind,direction}) => {
    return (
        <>
          <p> <b>Wind:</b> {wind} mph direction {direction}</p>
        </>
    )
}

const ShowWeather = ({weather}) => {
    return (
        <>
            <Temperature weather={weather.current.temperature} />
            <Icon icon={weather.current.weather_icons} />
            <Wind wind={weather.current.wind_degree} direction={weather.current.wind_dir} />
        </>
    )
}
export default ShowWeather