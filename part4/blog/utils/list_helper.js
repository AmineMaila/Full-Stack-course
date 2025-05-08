const dummy = (blogs) => {
  return (1)
}

const totalLikes = (blogs) => {
	const total = blogs.reduce((acc, curr) => {
		return acc + curr.likes
	}, 0)

	return (total)
}

const favoriteBlog = (blogs) => {
	const favorite = blogs.reduce((max, curr) => {
		return max.likes > curr.likes ? max : curr
	}, blogs[0])

	return (favorite)
}

const mostBlogs = (blogs) => {
	const authors = {}
	for (const blog of blogs) {
		if (blog.author in authors)
			authors[blog.author]++
		else
			authors[blog.author] = 1
	}

	const most = { author:'', blogs: 0 }
	for (const author in authors) {
		if (authors[author] > most.blogs) {
			most.author = author
			most.blogs = authors[author]
		}
	}
	
	return (most)
}

const mostLikes = (blogs) => {
	const authors = {}
	for (const blog of blogs) {
		if (blog.author in authors)
			authors[blog.author] += blog.likes
		else
			authors[blog.author] = blog.likes
	}

	const most = { author:'', likes: 0 }
	for (const author in authors) {
		if (authors[author] > most.likes) {
			most.author = author
			most.likes = authors[author]
		}
	}
	
	return (most)
}

module.exports = {
  dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}