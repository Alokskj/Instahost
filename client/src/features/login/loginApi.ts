import request from '@/services/axios/request';
import { Login } from './types';

export const loginApi = async (data: Login) => {
    try {
        const response = await request.post<{ token: string }>(
            '/api/auth/login',
            data,
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
