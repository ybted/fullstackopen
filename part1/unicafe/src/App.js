import { useState } from 'react'

const Header = ( {text} ) => <h2>{text}</h2>


const Button = ( {text, handclick, value} ) => 
  <button onClick={() => {handclick(value + 1)}}>
    {text}
  </button>

const StatisticLine = ({text, value}) => {
  if(text === "positive")
    return (
      <tr>
        <td>{text} </td>
        <td>{value} %</td>
      </tr>)
  else  
    return (
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
)}

const Total = ( {good, neutral, bad} ) => 
{  
  if (good + neutral + bad === 0)
    return <p>No feedback given </p>
  else 
    return <table>
              <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="average" value={(good - bad) / 3} />
                <StatisticLine text="positive" value={(good * 100 / (good + bad + neutral))} />    
              </tbody>
          </table>
         
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handclick={setGood} value={good}/>
      <Button text="neutral" handclick={setNeutral} value={neutral} />
      <Button text="bad" handclick={setBad} value={bad} />
      <Header text="Statistics" />
      <Total good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App