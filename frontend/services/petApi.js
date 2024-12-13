import apiUrls from "../consts/apiUrls"
import {fetchUserData} from "./userApi"
import { postData, getData, updateMultipartData, deleteMultipartData } from "./apiRequests"

export const getUserPets = async () =>
{
    const url = apiUrls.pet.basic
    
    try {
        return await getData(url, true)
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }  
}

export const savePet = async (data) => {
    try {
        const response = await postData(apiUrls.pet.create, data, true);
        await fetchUserData();
        return response;
    } catch (error) {
        console.error("Creating pet profile error:", error.message || error);
        throw error;
    }
};

export const savePetPhoto = async (data) => {
    //TODO: change 2 to real id
    const apiUrl = apiUrls.pet.basic + "/24/image";

    if (data == null) {
        try {
            const response = await deleteMultipartData(apiUrl);
            await fetchUserData();
            return response;
        } catch (error) {
            await fetchUserData();
        }
    }

    const formData = new FormData();
    formData.append('image', {
        uri: data,
        type: "image/jpg",
        name: `photo.jpg`
    });

    try {
        const response = await updateMultipartData(apiUrl, formData);
        await fetchUserData();
        return response;
    } catch (error) {
        console.error(`Error uploading photo:`, error.message || error);
        await fetchUserData();
    }
};