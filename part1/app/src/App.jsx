const Header = (props) => {
	return (
		<>
			<h1>{props.course.name}</h1>
		</>
	)
}

const Part = (props) => {
	return (
		<>
			<p>{props.part.name} {props.part.exercises}</p>
		</>
	)
}

const Content = (props) => {
	console.log(props)
	return (
		<div>
			<Part part={props.parts[0]} />
			<Part part={props.parts[1]} />
			<Part part={props.parts[2]} />
		</div>
	)
}

const Total = (props) => {
	let sum = 0
	for (let i = 0; i < props.exercises.length; i++)
		sum += props.exercises[i]
	return (
		<div>
			<p>Number of exercises {sum}</p>
		</div>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
		{
			name: 'Fundamentals of React',
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
			<Header course={course} />
			<Content parts={course.parts} />
			<Total exercises={[course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises]} />
		</div>
	)
}

export default App