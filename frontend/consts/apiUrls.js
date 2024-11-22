const baseApi = process.env.EXPO_PUBLIC_API_URL;

const apiUrls = {
    auth: {
        login: `${baseApi}/api/v1/auth/login`,
        register: `${baseApi}/api/v1/auth/register`
    },

};

export default apiUrls;