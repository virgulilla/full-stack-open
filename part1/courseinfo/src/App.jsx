const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts }) => {
  const result = parts .map((row) => <p>{row.part} {row.excercises}</p>)
  return result
}

const Total = ({parts }) => {
  const sum = parts .reduce((acc, row) => acc + row.excercises, 0)
  return  <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {part: 'Fundamentals of React', excercises: 10},
    {part: 'Using props to pass data', excercises: 7},
    {part: 'State of a component', excercises: 14},
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts ={parts } />      
      <Total parts ={parts } />  
    </div>
  )
}

export default App
