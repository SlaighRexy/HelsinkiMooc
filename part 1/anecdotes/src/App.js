import React, {useState} from "react";
  
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button> 

const ShowAnecdote = ({anect, showVote}) =>{
  return(
    <>
      <h1>Anecdote of the day</h1>
      <p>{anect}</p>
      <p>has {showVote} votes</p>
    </>
  )
}

const MostVote = ({anect, votes}) =>{

  let highestVote = 0;
  let highestVoteIndex = 0;

  for(let i = 0; i < votes.length; i++) {
    if(highestVote < votes[i])
    {       
      highestVote = votes[i];  
      highestVoteIndex = i;    
    }
  }
  
  console.log("voteIndex",highestVoteIndex);
  console.log("highest",highestVote);
  return(
    
    <>
      <h1>Anecdote with most votes</h1> 

      <p>{anect[highestVoteIndex]}</p>
      <p>has {highestVote} votes</p>
    </>
  )
}

const App = () => {
   
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);  
  const [showVote, setShowVote] = useState(0); 
  const [vote, setVote] = useState([...anecdotes].fill(0));
 

  const handleClick = () => {

    const newSelected =  Math.floor(Math.random() * 7) ;
    setSelected(newSelected);  
    setShowVote(vote[newSelected])
    
  }

  const voteClick = () => { 

    vote[selected] +=1
    setVote(vote); 
    setShowVote(vote[selected])    
    
  }
 

  return (
    <div>
      <ShowAnecdote anect={anecdotes[selected]} showVote={showVote} />       
      <p>
        <Button handleClick={voteClick} text="vote" />
        <Button handleClick={handleClick} text="next anecdotes" />
      </p>
      <MostVote anect={anecdotes} votes={vote} />  
    </div>
  )
}

export default App; 
