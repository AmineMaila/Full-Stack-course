import Blog from './Blog'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogPage = ({ user, setUser }) => {
	const [blogs, setBlogs] = useState([])
	
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])
	
	const handleLogout = () => {
		window.localStorage.removeItem('LoggedInBlogAppUser')
		setUser(null)
	}

	return (
		<>
			<h2>blogs</h2>
			<div>
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</div>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</>
	)
}

export default BlogPage