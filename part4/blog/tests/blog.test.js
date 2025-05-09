const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { initialBlogs } = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('total likes of multiple blogs', () => {
    const result = listHelper.totalLikes(initialBlogs)
    assert.strictEqual(result, 36)
  })

	test('list has only one blog equals the likes of that blog', () => {
    const result = listHelper.totalLikes([{
			_id: "5a422bc61b54a676234d17fc",
			title: "Type wars",
			author: "Robert C. Martin",
			url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
			likes: 2,
			__v: 0
		}])
    assert.strictEqual(result, 2)
  })
})

describe('most liked', () => {

  test('most likes from a list of blogs', () => {
    const result = listHelper.favoriteBlog(initialBlogs)
    assert.deepStrictEqual(result, {
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		})
  })
})

describe('most blogs', () => {

  test('most blogs from a list of blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    assert.deepStrictEqual(result, {
			author: "Robert C. Martin",
			blogs: 3
		})
  })
})

describe('most likes', () => {

  test('most liked author\'s blog from a list of blogs', () => {
    const result = listHelper.mostLikes(initialBlogs)
    assert.deepStrictEqual(result, {
			author: "Edsger W. Dijkstra",
			likes: 17
		})
  })
})

