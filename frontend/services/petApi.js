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