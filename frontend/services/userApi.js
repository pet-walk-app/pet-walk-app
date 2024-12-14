import apiUrls from '../consts/apiUrls'
import { getData, postData } from './apiRequests'

export const fetchUserData = async () => {
    try {
        const userData = await getData(apiUrls.user.profile, true);
        if (userData) {
            return userData
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
      console.error("Getting profile error:", error.message || error);
      throw error;
  }
};