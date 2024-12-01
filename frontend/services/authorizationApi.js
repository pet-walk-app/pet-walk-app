import AsyncStorage from "@react-native-async-storage/async-storage"
import { postData } from "./apiRequests"
import apiUrls from '../consts/apiUrls'

export const loginUser = async (credentials) => {
    try {
        const response = await postData(apiUrls.auth.login, credentials, false)
        const token = response.token
        
        if (token) {
            await AsyncStorage.setItem('jwt_token', token)
            await AsyncStorage.setItem('email', credentials.email)
            await AsyncStorage.setItem('password', credentials.password)
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
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('password')
        console.log('Login successfull')
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

export const saveCaregiver = async (data) => {
    try {
        const response = await postData(apiUrls.auth.caregiver, data, true);

        return response;
    } catch (error) {
        console.error("Creating caregiver profile error:", error.message || error);
        throw error;
    }
};

//This part doesn't work :(
export const savePet = async (data) => {
    try {
        const response = await postData(apiUrls.auth.pet, data, true);

        return response;
    } catch (error) {
        console.error("Creating pet profile error:", error.message || error);
        throw error;
    }
};

export const createProfile = async (data) => {
    const updatedData = {
        ...data,
        email: await AsyncStorage.getItem("email"),
        password: await AsyncStorage.getItem("password")
    };

    try {
        const response = await postData(apiUrls.auth.createProfile, updatedData, true);

        return response;
    } catch (error) {
        console.error("Creating profile error:", error.message || error);
        throw error;
    }
};