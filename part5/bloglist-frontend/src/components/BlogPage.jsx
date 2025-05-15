import Blog from './Blog'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogPage = ({ user }) => {
	const [blogs, setBlogs] = useState([])
	
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])
	
	return (
		<>
			<h2>blogs</h2>
			<p>{user.name} logged in</p>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</>
	)
}

export default BlogPage