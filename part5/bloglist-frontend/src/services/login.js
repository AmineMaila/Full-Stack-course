import axios from "axios"

const baseUrl = '/api/login'
let token = null

export const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const login = async credentials => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, credentials, config)
	return (response.data)
}

export default login