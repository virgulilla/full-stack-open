const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
 const result = parts.map( part =>  <Part key={part.id} part={part} />)

 const total = parts.reduce((acc, part) => acc + part.exercises, 0)

 return (
    <>
        {result}
        <p><strong>Total of {total} exercises</strong></p>
    </>
 )
}

export default Content