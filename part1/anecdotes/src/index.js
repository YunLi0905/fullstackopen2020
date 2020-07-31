import React, { useState } from "react"
import ReactDOM from "react-dom"

const Header = props => {
  return <h2>{props.text}</h2>
}

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const getRandomInt = () => Math.floor(Math.random() * anecdotes.length)

const incrementPoint = (points, selected, setPoints) => {
  const pointsCopy = [...points]
  pointsCopy[selected] += 1
  setPoints(pointsCopy)
}

const indexOfMax = points => {
  var max = points[0]
  var maxIndex = 0

  for (var i = 1; i < points.length; i++) {
    if (points[i] > max) {
      maxIndex = i
      max = points[i]
    }
  }
  return maxIndex
}
const App = props => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  console.log(points)
  console.log(points[selected])
  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button
        handleClick={() => incrementPoint(points, selected, setPoints)}
        text="vote"
      />
      <Button
        handleClick={() => {
          setSelected(getRandomInt)
        }}
        text="next anecdote"
      />
      <Header text="Anecdote with most votes" />
      <p>{props.anecdotes[indexOfMax(points)]}</p>
      <p>has {points[indexOfMax(points)]} votes</p>
    </div>
  )
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))
