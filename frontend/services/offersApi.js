import apiUrls from '../consts/apiUrls';
import { postData, getData, updateData, deleteData } from './apiRequests';

export const fetchOffers = async (page, pageSize, sortBy, sortDirection, filters) => {
    const queryParams = `?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_direction=${sortDirection}`;
    const url = `${apiUrls.offers.search}${queryParams}`;

    try {
        filters = convertFiltersToJson(filters)
        const response = await postData(url, filters, true);
        return response;
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }
};

export const fetchMyAllOffers = async (page, pageSize, sortBy, sortDirection) => {
    const queryParams = `?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_direction=${sortDirection}`;
    const url = `${apiUrls.offers.all}${queryParams}`;

    try {
        const response = await getData(url, true, true);
        return response;
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }
};

export const fetchPendingOffers = async (page, pageSize) => {
    const queryParams = `?page=${page}&page_size=${pageSize}`;
    const url = `${apiUrls.offers.pendingOffers}${queryParams}`;

    try {
        const response = await getData(url, true, true);
        return response;
    } catch (error) {
        console.error('Fetch pending offers error:', error.message);
        throw error;
    }
};

export const fetchAcceptedOffers = async (page, pageSize) => {
    const queryParams = `?page=${page}&page_size=${pageSize}`;
    const url = `${apiUrls.offers.acceptedOffers}${queryParams}`;

    try {
        const response = await getData(url, true, true);
        return response;
    } catch (error) {
        console.error('Fetch accepted offers error:', error.message);
        throw error;
    }
};

const convertFiltersToJson = (filters) => {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined)
    );
  };

export const getOfferById = async (offerId) => {
    const url = `${apiUrls.offers.all}/${offerId}`;
    try {
        return await getData(url, true)
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }  
}

export const updateOffer = async (body, offerId) => {

    const url = `${apiUrls.offers.all}/${offerId}`;

    try {
        await updateData(url, body, true);
    } catch (error) {
        console.error('Edit offer error:', error.message);
        throw error;
    }
}

export const addOffer = async (body) => {

    const url = `${apiUrls.offers.all}`;

    try {
        await postData(url, body, true);
    } catch (error) {
        console.error('Add offer error:', error.message);
        throw error;
    }
}

export const applyToOffer = async (offerId) => {

    const url = apiUrls.offers.apply + "/" + offerId;

    try {
        await getData(url, true);
    } catch (error) {
        //console.error('Apply to offer error:', error.message);
        //throw error;
    }
}

export const deleteApplyToOffer = async (offerId) => {

    const url = apiUrls.offers.apply + "/" + offerId;

    try {
        await deleteData(url, true);
    } catch (error) {
        //console.error('Apply to offer error:', error.message);
        //throw error;
    }
}

export const deleteOffer = async (offerId) => {

    const url = apiUrls.offers.all + "/" + offerId;

    try {
        await deleteData(url, true);
    } catch (error) {
        console.error('Deleting offer error:', error.message);
        throw error;
    }
}

export const acceptSomeoneToOffer = async (offerId, caregiverId) => {

    const url = apiUrls.user.acceptSomeoneToOffer + "/" + offerId + "?applicationId=" + caregiverId;

    try {
        await getData(url, true);
    } catch (error) {
        console.error('Accepting someone to offer error:', error.message);
        throw error;
    }
}

//Currently this function is not in use, but it can be added as we develop app further
/*export const rejectSomeoneToOffer = async (offerId, caregiverId) => {

    const url = apiUrls.user.rejectSomeoneToOffer + "/" + offerId + "?applicationId=" + caregiverId;
    console.log(url)

    try {
        await getData(url, true);
    } catch (error) {
        console.error('Rejecting someone to offer error:', error.message);
        throw error;
    }
}*/