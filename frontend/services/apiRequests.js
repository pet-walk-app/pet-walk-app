import AsyncStorage from "@react-native-async-storage/async-storage"
import {getGeoLocation} from "../helpers/GeoLocationGetter";

const fetchMultipartData = async (apiUrl, method, body) => {
	let token = await AsyncStorage.getItem("jwt_token");
	let URL = apiUrl;
  
	let headers = {
	  Authorization: 'Bearer ' + token,
	  Accept: 'application/json',
	};
  
	let obj = {
	  method: method,
	  headers: headers,
	  body: body,
	};
  
	return fetch(URL, obj)
	  .then(async (resp) => {
		if (resp.status === 204) {
		  return;
		}
  
		try {
		  let json = await resp.json();
		  if (resp.ok) {
			return json;
		  }
		  throw json;
		} catch (err) {
		  if (resp.ok) {
			return;
		  }
		  throw err;
		}
	  })
	  .catch((error) =>
		console.error('Error while fetching multipart data:', error)
	  );
  };
  

const defaultHeaders = {
	"Content-Type": "application/json",
}

const fetchData = async (apiUrl, method, body = null, authorize = false, addLocation = false) => {
	const headers = {
		...defaultHeaders,
		...(addLocation && await getGeoLocation())
	}

	await addAuthorizationHeader(headers, authorize)

	const response = await fetch(apiUrl, {
		method: method,
		headers: headers,
		body: body ? JSON.stringify(body) : null,
	})

	await handleResponse(response)
	
	return response?.json()
}

const sendRequest = async (apiUrl, method, body = null, authorize = false) => {
	const headers = {
		...defaultHeaders,
	}

	await addAuthorizationHeader(headers, authorize)

	const response = await fetch(apiUrl, {
		method: method,
		headers: headers,
		body: body ? JSON.stringify(body) : null,
	})

	await handleResponse(response);
}

export const getData = (apiUrl, authorize, addLocation) => fetchData(apiUrl, "GET", null, authorize, addLocation)
export const postData = (apiUrl, body, authorize, addLocation) => fetchData(apiUrl, "POST", body, authorize, addLocation)
export const updateData = (apiUrl, body, authorize) => fetchData(apiUrl, "PUT", body, authorize)
export const deleteData = (apiUrl, authorize) => sendRequest(apiUrl, "DELETE", null, authorize)
export const patchData = (apiUrl, body, authorize) => fetchData(apiUrl, "PATCH", body, authorize)

export const postMultipartData = (apiUrl, body) => fetchMultipartData(apiUrl, "POST", body)
export const updateMultipartData = (apiUrl, body) => fetchMultipartData(apiUrl, "PUT", body)
export const deleteMultipartData = (apiUrl) => fetchMultipartData(apiUrl, "DELETE", null)

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
