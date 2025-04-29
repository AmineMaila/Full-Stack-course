import axios from 'axios'
import { useEffect, useState } from 'react'

const DisplayView = ({ country }) => {
	return (
		<div className='country'>
			<h1>{country.name.common}</h1>
			<p>
				Capital {country.capital}<br />
				Area {country.area}
			</p>
			<h1>Languages</h1>
			<ul>
				{Object.values(country.languages).map((value, index) => (
					<li key={index}>{value}</li>
				))}
			</ul>
			<img alt={country.flags.alt} src={country.flags.svg} width={200}/>
		</div>
	)
}

const Country = ({ country }) => {
	const [showView, setShowView] = useState(false)

	return (
		<div>
			{country.name.common}
			<button onClick={() => setShowView(!showView)}>{showView ? 'hide' : 'show'}</button>
			{showView && <DisplayView country={country} />}
		</div>
	)
}

const ListCountries = ({ countries }) => {

	return ( 
		countries.map(country => {
			return (
				<Country key={country.name.common} country={country} />
			)
		})
	)
}

const Display = ({ data }) => {

	if (data.length > 1 && data.length <= 10){
		return (
			<ListCountries countries={data}/>
		)
	} else if (data.length === 1) {
		return (
			<DisplayView country={data[0]} />
		)
	} else {
		return (
			<>Too many matches, specify another filter</>
		)
	}
}

const App = () => {
	const [filter, setFilter] = useState('')
	const [countries, setCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((response) => {
				setCountries(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	const handleChange = (event) => {
		event.preventDefault()
		setFilter(event.target.value)
		if (countries.length !== 0)
		{
			setFilteredCountries(
				countries.filter(obj => (
					obj.name.common.toLowerCase().includes(event.target.value.toLowerCase())
				)))
		}
	}

  return (
    <>
			<div className='filter'>
				find countries <input value={filter} onChange={handleChange}></input>
			</div>
			{filter && <Display data={filteredCountries} />}
    </>
  )
}

export default App
