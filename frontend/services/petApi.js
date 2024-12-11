import apiUrls from "../consts/apiUrls"
import { getData } from "./apiRequests"

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
    const formData = new FormData();
    formData.append('pet', JSON.stringify(data))
    try {
        return await postMultipartData(apiUrls.pet.create, formData);
    } catch (error) {
        console.error("Creating pet profile error:", error.message || error);
        throw error;
    }
};