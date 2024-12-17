import apiUrls from "../consts/apiUrls"
import {fetchUserData} from "./userApi"
import { postData, updateData, getData, updateMultipartData, deleteMultipartData } from "./apiRequests"

export const getUserPets = async () =>
{
    const url = apiUrls.pet.ba
    
    try {
        return await getData(url, true)
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }  
}

export const getPet = async (petId) =>
    {
        const url = apiUrls.pet.basic + "/" + petId
        
        try {
            return await getData(url, true)
        } catch (error) {
            console.error('Fetch offers error:', error.message);
            throw error;
        }  
    }

export const savePet = async (data, petId) => {
    
    if (petId == null){
        // Create new pet
        try {
            const response = await postData(apiUrls.pet.create, data, true);
            await fetchUserData();
            return response;
        } catch (error) {
            console.error("Creating pet profile error:", error.message || error);
            throw error;
        }
    }
    else{
        // Edit existing pet
        const url = apiUrls.pet.edit + "/" + petId;
        try {
            const response = await updateData(url, data, true);
            await fetchUserData();
            return response;
        } catch (error) {
            console.error("Editing pet profile error:", error.message || error);
            throw error;
        }
    }
};


export const savePetPhoto = async (data, petId) => {
    const apiUrl = apiUrls.pet.basic + "/" + petId + "/image"

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

export const deletePetPhoto = async (data, petId) => {
    const apiUrl = apiUrls.pet.basic + "/" + petId + "/image"

    if (data == null) {
        try {
            const response = await deleteMultipartData(apiUrl);
            await fetchUserData();
            return response;
        } catch (error) {
            await fetchUserData();
        }
    }
};