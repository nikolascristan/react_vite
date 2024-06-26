const Course = (props) => {
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
          {props.parts.map((part) => (
            <Part key={part.id} part={part.name} exercise={part.exercises} />
          ))}
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
          <b>total of {totalExercises} exercises</b>
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
  
    return(
      <div>
        <Header course={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
  
  
  }

  export default Course