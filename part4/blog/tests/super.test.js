const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const { initBlogs, initialBlogs } = require('./test_helper')

const api = supertest(app)

beforeEach( async () => {
	await initBlogs()
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

after(() => {
	mongoose.connection.close()
})
