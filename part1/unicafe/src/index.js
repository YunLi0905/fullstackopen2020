import React, { useState } from "react"
import ReactDOM from "react-dom"

const Header = props => {
  return <h2>{props.text}</h2>
}

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Display = props => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / total) * 100 + "%"

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={total} />
      <Display text="average" value={average} />
      <Display text="positive" value={positive} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
