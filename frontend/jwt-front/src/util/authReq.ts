import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
})

let isTokenRefreshing = false;

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const {
            config,
            response: { status },
        } = error;
        if (status === 401 && !isTokenRefreshing) {
            isTokenRefreshing = true;
            if (error.response.data === "TokenExpiredError") {
                const originalRequest = config;
                const { data } = await axios.get('/api/refresh/token');
                const {
                    accessToken: newAccessToken,
                } = await data;
                console.log(data);
                instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                isTokenRefreshing = false;
                return instance(originalRequest);
            }
        }
        isTokenRefreshing = false;
        return Promise.reject(error);
    }
)

export default instance;