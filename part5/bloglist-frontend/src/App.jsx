import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogPage from './components/BlogPage'

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)
	const [user, setUser] = useState(null)

  return (
		<div>
			{
				user === null
				? <LoginForm setUser={setUser} notif={{
						errorMessage,
						setErrorMessage,
						successMessage,
						setSuccessMessage 
					}} />
      	: <BlogPage user={user} setUser={setUser} notif={{
						errorMessage,
						setErrorMessage,
						successMessage,
						setSuccessMessage 
					}} />
			}
    </div>
  )
}

export default App