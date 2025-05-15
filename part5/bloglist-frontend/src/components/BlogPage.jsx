import Blog from './Blog'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

const BlogPage = ({ user, setUser, notif }) => {
	const [blogs, setBlogs] = useState([])
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])
	
	const handleLogout = () => {
		window.localStorage.removeItem('LoggedInBlogAppUser')
		setUser(null)
	}

	const createBlog = async (event) => {
		event.preventDefault()

		try {
			const response = await blogService.create({ title, author, url })
			notif.setSuccessMessage(`a new blog ${response.title} by ${response.author} added`)
			setTimeout(() => {
				notif.setSuccessMessage(null)
			}, 5000)
			setBlogs(blogs.concat(response))
		}
		catch (e) {
			console.error(e)
			notif.setErrorMessage(e.response.data.error)
			setTimeout(() => {
				notif.setErrorMessage(null)
			}, 5000)
		}
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
			<h2>Create new</h2>
			<form onSubmit={createBlog}>
				<div>
					title:<input
							type='text'
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
				</div>
				<div>
					author:<input
							type='text'
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
				</div>
				<div>
					url:<input
							type='text'
							value={url}
							onChange={({ target }) => setUrl(target.value)}
						/>
				</div>
				<button type='submit'>create</button>
			</form>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</>
	)
}

export default BlogPage