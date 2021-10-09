import React from 'react';
import Button from './Button';

const Country = ({country, showCountryDetails}) => {    

    return(
        <>
            <li>{country} <Button text="show" handleClick={() => showCountryDetails(country)} /> </li>
        </>
    )
}

export default Country;