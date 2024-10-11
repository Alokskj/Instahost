import axios, { AxiosResponse, AxiosError } from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    timeout: 2 * 60 * 1000, // Set timeout to 2 mins
    withCredentials: true, // Ensure cookies are sent
});

// Response interceptor to handle global errors
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response, // Successful responses
    (error: AxiosError) => {
        if (error.response) {
            const { data } = error.response;
            const errorMessage =
                (data as { message: string }).message || 'Something went wrong';

            error.message = errorMessage;
        } else {
            error.message = 'Network error, please check your connection.';
        }
        return Promise.reject(error); // Propagate the error for handling elsewhere
    },
);

export default apiClient;
