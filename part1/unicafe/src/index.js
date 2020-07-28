import React, { useState } from "react"
import ReactDOM from "react-dom"

const Header = props => {
  return <h2>{props.text}</h2>
}

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Statistic = props => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = props => {
  console.log(props)
  if (props.total === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={props.good} />

          <Statistic text="neutral " value={props.neutral} />

          <Statistic text="bad" value={props.bad} />

          <Statistic text="all" value={props.total} />

          <Statistic text="average" value={props.average} />

          <Statistic text="positive" value={props.positive} />
        </tbody>
      </table>
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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
