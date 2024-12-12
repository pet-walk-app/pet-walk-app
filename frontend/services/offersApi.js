import apiUrls from '../consts/apiUrls';
import { postData, getData, updateData } from './apiRequests';

export const fetchOffers = async (page, pageSize, sortBy, sortDirection, filters) => {
    const queryParams = `?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_direction=${sortDirection}`;
    const url = `${apiUrls.offers.allOffers}${queryParams}`;

    try {
        filters = convertFiltersToJson(filters)
        const response = await postData(url, filters, true);
        return response;
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }
};

export const fetchAllOffers = async (page, pageSize, sortBy, sortDirection) => {
    const queryParams = `?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_direction=${sortDirection}`;
    const url = `${apiUrls.offers.singleOffer}${queryParams}`;

    try {
        const response = await getData(url, true);
        return response;
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }
};

const convertFiltersToJson = (filters) => {
    return Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined)
    );
  };

export const getOfferById = async (offerId) => {
    const url = `${apiUrls.offers.singleOffer}${offerId}`;

    try {
        return await getData(url, true)
    } catch (error) {
        console.error('Fetch offers error:', error.message);
        throw error;
    }  
}

export const updateOffer = async (body, offerId) => {

    const url = `${apiUrls.offers.singleOffer}${offerId}`;

    try {
        await updateData(url, body, true);
    } catch (error) {
        console.error('Edit offer error:', error.message);
        throw error;
    }
}

export const addOffer = async (body) => {

    const url = `${apiUrls.offers.singleOffer}`;

    try {
        await postData(url, body, true);
    } catch (error) {
        console.error('Add offer error:', error.message);
        throw error;
    }
}
