import AsyncStorage from "@react-native-async-storage/async-storage"
import { postData, getData, deleteData, postMultipartData } from "./apiRequests"
import apiUrls from '../consts/apiUrls'

export const loginUser = async (credentials) => {
    try {
        const response = await postData(apiUrls.auth.login, credentials, false)
        const token = response.token
        
        if (token) {
            await AsyncStorage.setItem('jwt_token', token)
        } else {
            throw new Error("Server didn't return JWT token.")
        }
        
        return response
    } catch (error) {
        console.error('Login error', error.message)
        throw error
    }
}


export const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem('jwt_token')
        console.log('Logout successfull')
    } catch (error) {
        console.error('Error while trying to logout', error.message)
        throw error
    }
}

export const registerUser = async (credentials) => {
    try {
        const response = await postData(apiUrls.auth.register, credentials, false)
        const token = response.token
        
        if (token) {
            await AsyncStorage.setItem('jwt_token', token)
        } else {
            throw new Error("Server didn't return JWT token.")
        }
        
        return response
    } catch (error) {
        console.error('Register error', error.message)
        throw error
    }
}