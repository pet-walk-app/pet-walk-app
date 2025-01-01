import { postData, deleteData, postMultipartData } from "./apiRequests"
import apiUrls from '../consts/apiUrls'


export const saveCaregiver = async (data) => {
  try {
      const response = await postData(apiUrls.caregiver.create, data, true);

      return response;
  } catch (error) {
      console.error("Creating caregiver profile error:", error.message || error);
      throw error;
  }
};


export const deleteCaregiverPhoto = async (id) => {
    try {
        const url = apiUrls.caregiver.deletePhoto + "/" + id;
        const response = await deleteData(url, true);
  
        return response;
    } catch (error) {
        console.error("Deleting caregiver photo error:", error.message || error);
        throw error;
    }
};


export const saveCaregiverPhoto = async (data) => {
  const responses = [];
  for (let i = 0; i < data.length; i++) {
      if (data[i] !== null && !data[i].startsWith("http")) {
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