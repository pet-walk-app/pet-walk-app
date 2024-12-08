import AsyncStorage from "@react-native-async-storage/async-storage"
import {getData, postData, postMultipartData} from "./apiRequests"
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
        const response = await postData(apiUrls.caregiver.create, data, true);

        return response;
    } catch (error) {
        console.error("Creating caregiver profile error:", error.message || error);
        throw error;
    }
};

export const saveCaregiverPhoto = async (data) => {
    //Delete all photos and then add new
    const responses = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] !== null) {
            const formData = new FormData();
            formData.append('files', {
                uri: data[i],
                type: "image/jpg",
                name: `photo${i + 1}.jpg`
            });

            try {
                const response = await postMultipartData(apiUrls.caregiver.addPhoto, formData);
                responses.push(response);
            } catch (error) {
                console.error(`Error uploading photo ${i + 1}:`, error.message || error);
            }
        }
    }

    return responses;
};

//This part doesn't work :(
export const savePet = async (data) => {

    console.log("1")
    console.log("2")
    
    const formData = new FormData();
    console.log("3")
    formData.append('pet', JSON.stringify(data))

    try {
        return await postMultipartData(apiUrls.pet.create, formData);
    } catch (error) {
        console.error("Creating pet profile error:", error.message, error);
        throw error;
    }
};

export const createProfile = async (data) => {
    try {
        const response = await postData(apiUrls.user.profile, data, true);

        return response;
    } catch (error) {
        console.error("Creating profile error:", error.message || error);
        throw error;
    }
};

export const getProfile = async () => {
    try {
        const response = await getData(apiUrls.user.profile, true);
        return response;
    } catch (error) {
        console.error("Creating profile error:", error.message || error);
        throw error;
    }
};