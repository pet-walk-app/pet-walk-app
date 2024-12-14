import apiUrls from '../consts/apiUrls'
import { getData, postData } from './apiRequests'
import { postMultipartData, deleteMultipartData } from './apiRequests';

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

export const saveUserPhoto = async (data) => {
  const apiUrl = apiUrls.user.image;

  if (!data) {
    throw new Error("No image data provided");
  }

  const formData = new FormData();
  formData.append("file", {
    uri: data,
    type: "image/jpg",
    name: "user_photo.jpg",
  });

  try {
    await postMultipartData(apiUrl, formData);
  } catch (error) {
    console.error("Error uploading user photo:", error.message || error);
    throw error;
  }
};

export const deleteUserPhoto = async () => {
  const apiUrl = apiUrls.user.image;

  try {
    await deleteMultipartData(apiUrl);
  } catch (error) {
    console.error("Error deleting user photo:", error.message || error);
    throw error;
  }
};



