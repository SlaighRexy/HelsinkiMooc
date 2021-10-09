import React from 'react'; 

const Persons  = ({name, number, deletePerson}) => {
  
    return(      
      <div> 
        {name} {number} <button onClick={deletePerson}>delete</button>
      </div>
    )
}

export default Persons