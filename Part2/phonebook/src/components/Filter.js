import React from 'react'; 

const Filter  = ({newSearch, handleFilterChange}) => {
  
    return(      
        <div>
            Filter shown with: <input value={newSearch} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter