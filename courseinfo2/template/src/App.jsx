




const App = () => {


const Course = () => {

    const Header = ({course}) => <h1>{course}</h1>

    const Content = ({parts}) => {

      const Total = () => {
        const initialTotal = 0



        const sum = parts.reduce((s,p) => s + p.exercises, initialTotal,)

        console.log(sum)

        return (
          <div>
            <h3>total of {sum} exercise </h3>
          </div>
        )

      }

      //Part component
      const Part = ({part}) =>
        <p>
          {part.name} {part.exercises}
        </p>

      return (
        <div>
          <Part part={parts[0]}></Part>
          <Part part={parts[1]}></Part>
          <Part part={parts[2]}></Part>
          <Part part={parts[3]}></Part>
          <Total></Total>


        </div>
      )
    }
    return (
      <div>
        <Header course={course}></Header>
        <Content parts={parts}></Content>

      </div>
    )
  }

 

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App