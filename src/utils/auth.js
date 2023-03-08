import axios from "axios"
import {host} from "../settings"

export const signInWithCredentials = async (email, password) => {
	const response = await axios.get(`${host  }/auth-signup?email=${email}&password=${password}`)
	const author_response = await axios.get(`${host  }/auth-profile?first_name${response.data.firstName}`)
	return author_response.data
}

export const signInWithToken = async (token) => {
	const config = {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
	const response = await axios.get(`${host  }/auth-token`, null, config)
	return response.data
}
