import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogPage from './components/BlogPage'

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)
	const [user, setUser] = useState(null)

	const notifyError = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}

	const notifySuccess = (message) => {
		setSuccessMessage(message)
		setTimeout(() => {
			setSuccessMessage(null)
		}, 5000)
	}

  return (
		<div>
			{
				user === null
				? <LoginForm setUser={setUser} notif={{
						errorMessage,
						notifyError,
						successMessage,
						notifySuccess 
						}}
					/>
      	: <BlogPage user={user} setUser={setUser} notif={{
						errorMessage,
						notifyError,
						successMessage,
						notifySuccess 
					}} />
			}
    </div>
  )
}

export default App