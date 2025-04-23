import { useState } from 'react'

const Button = ({onClick, text}) => <><button onClick={onClick}>{text}</button></>

const StatisticLine = ({text, value}) => {
	return (
		<>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const total = good + neutral + bad

	// prevents NaN when dividing by 0
	const average = total == 0 ? 0 : (good - bad) / total
	const positive = total == 0 ? 0 : (good / total) * 100

	if (good || bad || neutral){
		return (
			<div>
				<table>
					<tbody>
						<StatisticLine text="good" value={good}/>
						<StatisticLine text="neutral" value={neutral}/>
						<StatisticLine text="bad" value={bad}/>
						<StatisticLine text="all" value={total}/>
						<StatisticLine text="average" value={average}/>
						<StatisticLine text="positive" value={positive.toString() + ' %'}/>
					</tbody>
				</table>
			</div>
		)
	} else {
		return (
			<div>
				<p>No feedback given</p>
			</div>
		)
	}
}


const App = () => {
  // save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

  return (
    <div>
		<h1>give feedback</h1>
		<Button onClick={() => setGood(good + 1)} text="good" />
		<Button onClick={() => setNeutral(neutral + 1) } text="neutral" />
		<Button onClick={() => setBad(bad + 1) } text="bad" />
		<h1>statistics</h1>
		<Statistics good={good} neutral={neutral} bad={bad} />
	</div>
  )
}

export default App