import Blog from './Blog'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogPage = ({ user, setUser }) => {
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
			setBlogs(blogs.concat(response))
		}
		catch (e) {
			console.error(e)
			alert('something went wrong')
		}
	}

	return (
		<>
			<h2>blogs</h2>
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