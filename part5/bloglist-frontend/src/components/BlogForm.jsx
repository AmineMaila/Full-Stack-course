import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({ addToBlogs, notifyError, notifySuccess }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const createBlog = async (event) => {
		event.preventDefault()

		try {
			const response = await blogService.create({ title, author, url })
			notifySuccess(`a new blog ${response.title} by ${response.author} added`)
			addToBlogs(response)
		}
		catch (e) {
			console.error(e)
			notifyError(e.response.data.error)
		}
	}
	
	return (
		<>
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
		</>
	)
}

export default BlogForm