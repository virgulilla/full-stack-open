import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = total ? (good  - bad) / total : 0
  const positive  = total ? (good / total) * 100 + ' %' : 0

  if (total === 0) {
    return (
      <>
        <div>No feedback given</div>
      </>
    )
  }
  return (
    <>
    <h2>statistics</h2>
    <table>      
      <tbody>
      <tr>
        <StatisticLine text="good" value={good}/>
      </tr>
      <tr>
        <StatisticLine text="neutral" value={neutral}/>
      </tr>
      <tr>
        <StatisticLine text="bad" value={bad}/>
      </tr>
      <tr>
        <StatisticLine text="total" value={total}/>
      </tr>
      <tr>
        <StatisticLine text="average" value={average}/>
      </tr>
      <tr>
        <StatisticLine text="positive" value={positive}/>
      </tr>
      </tbody>
    </table>
    </>
  )
}

const Button = ({handleClick, who}) =>  {
  return <button onClick={handleClick}>{who}</button>
}

const StatisticLine = ({text, value}) => <><td>{text}</td><td>{value}</td></>


const App = () => {  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  const giveFeedBack = (who) => {
    const handler = () => {
      if (who === 1) {
        setGood(good + 1)
      } else if (who === 0)  {
        setNeutral(neutral + 1)
      } else if (who === -1)  { 
        setBad(bad + 1)
      }
    }

    return handler
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={giveFeedBack(1)} who="Good" />
      <Button handleClick={giveFeedBack(0)} who="Neutrañ" />
      <Button handleClick={giveFeedBack(-1)} who="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App