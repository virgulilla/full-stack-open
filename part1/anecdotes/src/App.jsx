import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomNumber = Math.floor(Math.random() * 8)
  const [selected, setSelected] = useState(randomNumber)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex)
  }

  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotedAnecdote = anecdotes[votes.indexOf(Math.max(...votes))];

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>
        <button onClick={handleVotes} anecdote={selected} >Vote</button>
        <button onClick={handleClick}>Next anecdote</button>
      </p>
      <h2>Anecdote with most votes</h2>
      {mostVotedAnecdote && <p>{mostVotedAnecdote}</p>}
    </div>
  )
}

export default App
