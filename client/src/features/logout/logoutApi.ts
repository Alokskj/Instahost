import request from '@/services/axios/request';

export const logoutApi = async () => {
    try {
        const response = await request.post<void>('/api/auth/logout', {});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
