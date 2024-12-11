const baseApi = 'http://10.0.2.2:8080';

const apiUrls = {
    auth: {
        login: `${baseApi}/api/v1/auth/login`,
        register: `${baseApi}/api/v1/auth/register`,
    },

    user: {
        profile: `${baseApi}/api/v1/user/profile`
    },

    pet: {
        basic: `${baseApi}/api/v1/pets`,
        create: `${baseApi}/api/v1/pets`,
    },

    caregiver: {
        create: `${baseApi}/api/v1/caregiver`,
        addPhoto: `${baseApi}/api/v1/caregiver/images`,
        deleteAllPhotos: `${baseApi}/api/v1/caregiver/images`
    },

    offers: {
        allOffers:  `${baseApi}/api/v1/offers/search`,
        singleOffer: `${baseApi}/api/v1/user/offers`
    }
};

export default apiUrls;