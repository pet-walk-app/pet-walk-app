import apiUrls from "../consts/apiUrls"
import { postData, getData, updateMultipartData, deleteMultipartData } from "./apiRequests"

export const getUserPets = async () =>
{
    url = apiUrls.pet.basic
    
    try {
        return await getData(url, true)
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }  
}

export const savePet = async (data) => {
    try {
        return await postData(apiUrls.pet.create, data, true);
    } catch (error) {
        console.error("Creating pet profile error:", error.message || error);
        throw error;
    }
};

export const savePetPhoto = async (data) => {
    const apiUrl = apiUrls.pet.basic + "/2/image";

    if (data == null) {
        try {
            return await deleteMultipartData(apiUrl);
        } catch (error) {
            
        }
    }

    const formData = new FormData();
    formData.append('image', {
        uri: data,
        type: "image/jpg",
        name: `photo.jpg`
    });

    try {
        return await updateMultipartData(apiUrl, formData);
    } catch (error) {
        console.error(`Error uploading photo:`, error.message || error);
    }
};