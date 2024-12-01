import apiUrls from '../consts/apiUrls'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getData, postData } from './apiRequests'

export const fetchUserData = async () => {
    try {
        const userData = await getData(apiUrls.user.profile, true);
        if (userData) {
            await AsyncStorage.setItem('user', JSON.stringify(userData)); 
        }
    } catch (error) {
        console.error('Fetch user error', error.message);
        throw error;
    }
};


export const editUser = async (name, dateOfBirth, email, newPassword) => {
    const body = {
      name: name,
      dateOfBirth: dateOfBirth,
      phone: email,
      ...(newPassword && { password: newPassword })
    };
  
    try {
      await postData(apiUrls.user.profile, body, true);
    } catch (error) {
      console.error("Update user error", error.message);
      throw error;
    }

    try {
        fetchUserData();
    } catch (error) {
        console.error("Update user error", error.message);
        throw error;
      }
    
  };
  
    


