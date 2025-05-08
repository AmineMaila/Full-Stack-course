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

module.exports = {
  dummy,
	totalLikes,
	favoriteBlog
}