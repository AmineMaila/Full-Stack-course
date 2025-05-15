import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogPage from './components/BlogPage'

const App = () => {
	const [user, setUser] = useState(null)

  return (
		<div>
			{
				user === null
				? <LoginForm setUser={setUser} />
      	: <BlogPage user={user} setUser={setUser} />
			}
    </div>
  )
}

export default App