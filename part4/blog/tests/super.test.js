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

after(() => {
	mongoose.connection.close()
})
