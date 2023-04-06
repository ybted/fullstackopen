const Header = ( {course} ) => (
  <h1> {course} </h1>
)

const Part = ( {part, exercises} ) => (
  <p> {part} {exercises} </p>
)

const Content = ( {parts} ) => (
    parts.map( part => <Part part={part.part} exercises={part.exercises} key={part.part} /> )
)

const Total = ( {num} ) => {
  <p>Number of exercises {num} </p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  let l = [{part: part1, exercises: exercises1},
       {part: part2, exercises: exercises2},
       {part: part3, exercises: exercises3}]

  return (
    <div>
      <Header course={course} />
      <Content  parts={l} />
      <Total num={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App