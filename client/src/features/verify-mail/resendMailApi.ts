import request from '@/services/axios/request';
import { ResendMail } from './types';

export const resendMailApi = async (data: ResendMail) => {
    try {
        const response = await request.post<void>(
            '/api/auth/send-verification',
            data,
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
