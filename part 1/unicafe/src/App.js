import React, {useState} from "react";
 


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button> 

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeeds, setAllFeeds] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  
  const handleGoodClick = () =>{
    let all = allFeeds + 1;
    let goo = good + 1;
    setGood(goo);  
    setAllFeeds(all); 
    setAverage(all/2);
    setPositive((goo/all) * 100);  
  } 
  
  const handleBadClick = () => {
    let all = allFeeds + 1;
    let boo = bad + 1;
    setBad(boo);
    setAllFeeds(all); 
    setAverage(all/2);
    setPositive((good/all) * 100);
  }

  const handleNeutralClick = () => {
    let all = allFeeds + 1;
    let neut = neutral + 1;
    setNeutral(neut);
    setAllFeeds(all); 
    setAverage(all/2);
    setPositive((good/all) * 100);
  }
  
const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td><td>{value}</td>
      </tr>
    </>
  )
}

  const Statistics = (props) => {
    if(props.allfeeds === 0) {
      return (
        <>
          No feedback given
        </>
      )
    }
    return(
      
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="all" value ={props.allfeeds} />
          <StatisticLine text="average" value ={props.average} />
          <StatisticLine text="positive" value ={props.positive+ '%'} /> 
        </tbody>
      </table>
    )
  }
  
  
  return (
    <div>       
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      
      <h1>Statistics</h1>
      
       <Statistics good={good} neutral={neutral} bad={bad} allfeeds={allFeeds} average={average} positive={positive} />
      
    </div>
  )
}

export default App; 
