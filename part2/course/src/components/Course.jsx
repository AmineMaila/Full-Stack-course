
const Header = ({course}) => <h1>{course}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ total }) => <div><strong>total of {total} exercises</strong></div>

const Content = ({ parts }) => (
	<div>
		{parts.map((part) => <Part key={part.id} part={part} />)}
		<Total total={parts.reduce((acc, part) => acc += part.exercises, 0)} />
	</div>
)

const Course = ({ course }) => {
	return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course