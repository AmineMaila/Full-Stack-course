const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const {
	initBlogs,
	initialBlogs,
	oneBlog
} = require('./test_helper')

const api = supertest(app)
let loginResponse

beforeEach( async () => {
	await User.deleteMany({})
	const userRes = await api.post('/api/users')
		.send({
			name: "ARON",
			username: "aaron",
			password: "aaron222",
		})
	await initBlogs(userRes.body)

	const login = {
		username: 'aaron',
		password: 'aaron222'
	}
	const res = await api.post('/api/login')
		.send(login)
		.expect(200)

	loginResponse = res.body
})

test('returned blogs are the expected length', async () => {
	const response = await api.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(response.body.length, initialBlogs.length)
})

test('returned blog has property id not _id', async () => {
	const response = await api.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	assert(response.body[0].hasOwnProperty('id') && !response.body[0].hasOwnProperty('_id'))
})

test('blog created successfully to database', async () => {
	const blog = {
		title: "HTTP cycle",
		author: "AmineMaila",
		url: "https://pine-meat-103.notion.site/Walkthrough-of-HTTPS-request-and-response-14abc3b09421804e92b3f2f4764c97c6?pvs=4",
		likes: 0
	}

	const response = await api.post('/api/blogs')
		.set('Authorization', 'Bearer ' + loginResponse.token)
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	assert.deepStrictEqual({
		title: response.body.title,
		author: response.body.author,
		url: response.body.url,
		likes: response.body.likes,
	},
	blog)

	const blogs = await api.get('/api/blogs')
		.expect(200)
	assert.strictEqual(blogs.body.length, initialBlogs.length + 1)
})

test('likes property defaults to 0 if not passed', async () => {
	const blog = {
		title: "HTTP cycle",
		author: "AmineMaila",
		url: "https://pine-meat-103.notion.site/Walkthrough-of-HTTPS-request-and-response-14abc3b09421804e92b3f2f4764c97c6?pvs=4"
	}

	const response = await api.post('/api/blogs')
		.set('Authorization', 'Bearer ' + loginResponse.token)
		.send(blog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(response.body.likes, 0)
})

test('missing title or url results in 400 bad request', async () => {
	const blogMissingTitle = {
		author: "AmineMaila",
		url: "https://pine-meat-103.notion.site/Walkthrough-of-HTTPS-request-and-response-14abc3b09421804e92b3f2f4764c97c6?pvs=4"
	}
	const blogMissingUrl = {
		title: "HTTP cycle",
		author: "AmineMaila",
	}

	await api.post('/api/blogs')
		.set('Authorization', 'Bearer ' + loginResponse.token)
		.send(blogMissingTitle)
		.expect(400)

	await api.post('/api/blogs')
		.set('Authorization', 'Bearer ' + loginResponse.token)
		.send(blogMissingUrl)
		.expect(400)
})

test('deleting a blog by id succeeds', async () => {
	const blog = await oneBlog()

	await api.delete(`/api/blogs/${blog.id}`)
		.set('Authorization', 'Bearer ' + loginResponse.token)
		.expect(204)

	assert.strictEqual(await Blog.findById(blog.id), null)
})

test('updating a blog by id succeeds', async () => {
	const blog = await oneBlog()

	await api.put(`/api/blogs/${blog.id}`)
		.send({
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: 500,
		})
		.expect(204)

	const resultBlog = await Blog.findById(blog.id)
	assert.strictEqual(resultBlog.likes, 500)
})

test('creating user fails if username already exists', async () => {
	const newUser = {
		name: 'Nama',
		username: 'aaron',
		password: 'aaa111'
	}

	const response = await api.post(`/api/users/`)
		.send(newUser)
		.expect(400)

	assert.strictEqual(response.body.error, 'username must be unique')
})

test('creating user fails if username length is less than 3', async () => {
	const newUser = {
		name: 'Nama',
		username: 'aa',
		password: 'aaa111'
	}

	const response = await api.post(`/api/users/`)
		.send(newUser)
		.expect(400)

	
	assert.strictEqual(response.body.error, 'User validation failed: username: username should be at least 3 characters long')
})

test('creating user fails if password length is less than 3', async () => {
	const newUser = {
		name: 'Nama',
		username: 'aawwwaa',
		password: 'aa'
	}

	const response = await api.post(`/api/users/`)
		.send(newUser)
		.expect(400)

	
	assert.strictEqual(response.body.error, 'password should be at least 3 characters long')
})

test('unauthorized returned properly', async () => {
	const blog = {
		title: "HTTP cycle",
		author: "AmineMaila",
		url: "https://pine-meat-103.notion.site/Walkthrough-of-HTTPS-request-and-response-14abc3b09421804e92b3f2f4764c97c6?pvs=4",
		likes: 0
	}

	await api.post('/api/blogs')
		.send(blog)
		.expect(401)

})

after(() => {
	mongoose.connection.close()
})
