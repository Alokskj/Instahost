import request from '@/services/axios/request';
import { User } from './user';

export const loadUserApi = async () => {
    try {
        const response = await request.get<User>('/api/auth/me');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
