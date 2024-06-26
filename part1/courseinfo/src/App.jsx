const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Content = (props) => {
  console.log(props)
  return(
    <div>
      <Part part = {props.parts[0].name} exercise = {props.parts[0].exercises}/>
      <Part part = {props.parts[1].name} exercise = {props.parts[1].exercises}/>
      <Part part = {props.parts[2].name} exercise = {props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const totalExercises = props.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);
  return(
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const App = () => {
  const course = {
      name: 'Half Stack application development',
      parts: [
      {
        name:'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App