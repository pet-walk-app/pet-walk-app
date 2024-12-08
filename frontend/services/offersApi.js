import apiUrls from '../consts/apiUrls';
import { postData } from './apiRequests';

export const fetchOffers = async (page, pageSize, sortBy, sortDirection, filters) => {
    const queryParams = `?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_direction=${sortDirection}`;
    const url = `${apiUrls.offers.allOffers}${queryParams}`;
    console.log(url)

    try {
        filters = convertFiltersToJson(filters)
        console.log(filters)
        const response = await postData(url, filters, true);
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
