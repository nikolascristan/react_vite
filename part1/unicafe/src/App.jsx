import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>

const Button = ({handleType, text}) => <button onClick={handleType}>{text}</button>


const Statistics = (props) => {
  if (props.total < 1) {
    return <p>No feedback given</p>;
  }
  return(
    <div>
      <Stat text = 'good' counter = {props.good}/>
      <Stat text = 'neutral' counter = {props.neutral}/>
      <Stat text = 'bad' counter = {props.bad}/>
      <Stat text = 'total' counter = {props.total}/>
      <Stat text = 'average' counter = {props.average}/>
      <Stat text = 'positive' counter = {props.positivePercentage}/>
    </div>
  )
}

const Stat = (props) => {
  const displayCounter = props.text === 'positive' ? `${props.counter}%` : props.counter
  return(
  <p>{props.text} {displayCounter}</p>
  )
}

function findAverage(arr) {
  if (arr.length === 0) return 0; // Handle empty array case
  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  return sum / arr.length;
}

function findPositive(arr) {
  let positiveCount = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      positiveCount++;
    }
  }
  
  const totalCount = arr.length;
  const positivePercentage = (positiveCount / totalCount) * 100;
  
  return positivePercentage;
}
  
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, settotal] = useState(0)
  const [allFeedback, setAllFeedback] = useState([])
  const [average, setAverage] = useState(0)
  const [positivePercentage, setpositivePercentage] = useState(0)
  const header = {
    title: [
      'give feedback',
      'statistics'
    ]
  }

  const  handleGood = () => {
    console.log('clicked good button')
    const updatedGood = good + 1
    setGood(updatedGood)
    settotal (updatedGood + neutral + bad)
    const updatedFeedback = (allFeedback.concat(1))
    setAllFeedback(allFeedback.concat(1))
    setAverage(findAverage(updatedFeedback))
    setpositivePercentage(findPositive(updatedFeedback))
  }
  
  const  handleNeutral = () => {
    console.log('clicked neutral button')
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    settotal (updatedNeutral + good + bad)
    const updatedFeedback = (allFeedback.concat(0))
    setAllFeedback(allFeedback.concat(0))
    setAverage(findAverage(updatedFeedback))
    setpositivePercentage(findPositive(updatedFeedback))
  }
  
  const  handleBad = () => {
    console.log('clicked bad button')
    const updatedBad=bad + 1
    setBad(updatedBad)
    settotal (updatedBad + good + neutral)
    const updatedFeedback = (allFeedback.concat(-1))
    setAllFeedback(allFeedback.concat(-1))
    setAverage(findAverage(updatedFeedback))
    setpositivePercentage(findPositive(updatedFeedback))
  }


  return (
    <div>
      <Header title = {header.title[0]}/>
      <Button handleType = {handleGood} text = 'good'/>
      <Button handleType = {handleNeutral} text = 'neutral'/>
      <Button handleType = {handleBad} text = 'bad'/>
      <Header title = {header.title[1]}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}total = {total}average = {average} positivePercentage = {positivePercentage} />
    </div>
  )
}
export default App