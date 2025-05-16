import Blog from './Blog'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogPage = ({ user, setUser, notif }) => {
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
			<Notification message={notif.errorMessage} classname='error notification' />
			<Notification message={notif.successMessage} classname='success notification' />
			<div>
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</div>

			<Togglable buttonLabel='add blog'>
				<BlogForm
					addToBlogs={(blog) => setBlogs(blogs.concat(blog))}
					notifyError={notif.notifyError}
					notifySuccess={notif.notifySuccess}
				/>
			</Togglable>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</>
	)
}

export default BlogPage