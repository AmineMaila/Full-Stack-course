import { useState } from 'react'

const Button = ({onClick, text}) => <><button onClick={onClick}>{text}</button></>

const Statistics = ({counts}) => {
	const total = counts.good + counts.neutral + counts.bad
	const average = total == 0 ? 0 : (counts.good - counts.bad) / total
	const positive = total == 0 ? 0 : (counts.good / total) * 100

	return (
		<div>
			<p>all {total}</p>
			<p>average {average < 0 ? 0 : average}</p>
			<p>positive {positive}</p>
		</div>
	)
}


const App = () => {
  // save clicks of each button to its own state
	const [counts, setCounts] = useState({good: 0, neutral: 0, bad: 0})

	const handleClick = (type) => {
		const updatedCounts = {...counts, [type]: counts[type] + 1}
		setCounts(updatedCounts)
	}

  return (
    <div>
		<h1>give feedback</h1>
		<Button onClick={() => handleClick('good')} text="good" />
		<Button onClick={() => handleClick('neutral') } text="neutral" />
		<Button onClick={() => handleClick('bad') } text="bad" />
		<h1>statistics</h1>
		<p>good {counts.good}</p>
		<p>neutral {counts.neutral}</p>
		<p>bad {counts.bad}</p>
		<Statistics counts={counts} />
	</div>
  )
}

export default App