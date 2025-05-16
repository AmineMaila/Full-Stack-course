import { useEffect, useState } from 'react'
import login from '../services/login'
import { setToken } from '../services/blogs'
import Notification from './Notification.jsx'

const LoginForm = ({ setUser, notif }) => {
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
		
			notif.notifySuccess('login successful')
			window.localStorage.setItem('LoggedInBlogAppUser', JSON.stringify(user))
			setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		}
		catch (e) {
			console.log(e)
			notif.notifySuccess(e.response.data.error)
		}
	}

	return (
		<>
			<h1>Log in to application</h1>
			<Notification message={notif.errorMessage} classname='error notification' />
			<Notification message={notif.successMessage} classname='success notification' />
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