import React from 'react';

 
const Header = ({course}) => { 
    return(
      <h2>{course}</h2>
    )
}

const Content  = ({parts}) => {
  
    return(
      
      <div> 
        {parts.map( part =>
          <Part key={part.id} name={part.name} numbers={part.exercises} /> 
        )}
        <Total exercises={parts} /> 
      </div>
    )
}

const Part  = ({name,numbers}) => {
    return(    
      <p>
          {name} {numbers}
      </p>
    )
}  
  
const Total  = ({exercises}) => {
    let sum = exercises.reduce((prev, cur) => prev + cur.exercises, 0);   
    return(
      <p><b>Number of exercises {sum}</b></p>
    )
}

const Course = ({course}) => {   
    return (
    <>
      
        <Header course={course.name} />
        <Content parts={course.parts} />
    </> 
    )
  }

  export default Course