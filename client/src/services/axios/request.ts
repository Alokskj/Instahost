import { AxiosResponse } from 'axios';
import apiClient from './agent';

// Type for request parameters (optional)
type Params = Record<string, any>;
type Body = Record<string, any>;
type ApiResponse<T> = {
    success: boolean;
    status: string;
    message: string;
    data?: T;
};
const responseBody = <T>(response: AxiosResponse<T>): ApiResponse<T> =>
    response.data as ApiResponse<T>;

const request = {
    get: <T>(url: string, params?: Params): Promise<ApiResponse<T>> =>
        apiClient.get(url, { params }).then(responseBody),

    post: <T>(url: string, body: Body): Promise<ApiResponse<T>> =>
        apiClient.post(url, body).then(responseBody),

    put: <T>(url: string, body: Body): Promise<ApiResponse<T>> =>
        apiClient.put(url, body).then(responseBody),

    delete: <T>(url: string): Promise<ApiResponse<T>> =>
        apiClient.delete(url).then(responseBody),
};

export default request;
