import { useEffect, useState } from 'react'
import login from '../services/login'
import { setToken } from '../services/login'

const LoginForm = ({ setUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		const userJSON = window.localStorage.getItem('LoggedInBlogAppUser')
		if (userJSON) {
			const user = JSON.parse(userJSON)
			setUser(user)
			setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await login({ username, password })
		
			window.localStorage.setItem('LoggedInBlogAppUser', JSON.stringify(user))
			setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		}
		catch (e) {
			alert(e.response.data.error)
			console.log(e)
		}
	}

	return (
		<>
			<h1>Log in to application</h1>
			<form onSubmit={handleLogin}>
				<div className='username-input'>
					username
					<input 
						type='text'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
						name='Username'
					/>
				</div>
				<div className='password-input'>
					password
					<input 
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						name='Password'
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</>
	)
}

export default LoginForm