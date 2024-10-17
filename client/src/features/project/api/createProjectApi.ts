import request from '@/services/axios/request';
export type createProjectBody = {
    name: string;
    gitURL?: string;
    subdomain: string;
};
export const createProjectApi = async (data: createProjectBody) => {
    const response = await request.post<{ _id: string }>('/api/projects', data);
    return response.data;
};
