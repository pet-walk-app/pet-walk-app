import AsyncStorage from "@react-native-async-storage/async-storage"

const defaultHeaders = {
	"Content-Type": "application/json",
}

const fetchData = async (apiUrl, method, body = null, authorize = false) => {
	const headers = {
		...defaultHeaders,
	}

	await addAuthorizationHeader(headers, authorize)

	const response = await fetch(apiUrl, {
		method: method,
		headers: headers,
		body: body ? JSON.stringify(body) : null,
	})

	await handleResponse(response)

	return response.json()
}

export const getData = (apiUrl, authorize) => fetchData(apiUrl, "GET", null, authorize)
export const postData = (apiUrl, body, authorize) => fetchData(apiUrl, "POST", body, authorize)
export const updateData = (apiUrl, body, authorize) => fetchData(apiUrl, "PUT", body, authorize)
export const deleteData = (apiUrl, authorize) => fetchData(apiUrl, "DELETE", null, authorize)
export const patchData = (apiUrl, body, authorize) => fetchData(apiUrl, "PATCH", body, authorize)

const addAuthorizationHeader = async (headers, authorize) => {
	if (authorize) {
		const token = await AsyncStorage.getItem("jwt_token")
		if (token) {
			headers["Authorization"] = `Bearer ${token}`
		}
	}
}

const handleResponse = async response => {
	if (!response.ok) {
		const errorBody = await response.json()
		throw new Error(errorBody.message || "Request failed")
	}
}
