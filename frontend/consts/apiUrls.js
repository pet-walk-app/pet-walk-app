const baseApi = 'http://10.0.2.2:8080';

const apiUrls = {
    auth: {
        login: `${baseApi}/api/v1/auth/login`,
        register: `${baseApi}/api/v1/auth/register`,
        caregiver: `${baseApi}/api/v1/caregiver`,
        pet: `${baseApi}/api/v1/pets`,
        createProfile: `${baseApi}/api/v1/user/profile`,
    },
};

export default apiUrls;