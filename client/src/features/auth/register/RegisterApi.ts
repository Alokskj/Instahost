import request from '@/services/axios/request';
import { Register } from './types';
import { User } from '@/features/auth/user/user';

export const registerApi = async (data: Register) => {
    try {
        const response = await request.post<User>('/api/auth/register', data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
