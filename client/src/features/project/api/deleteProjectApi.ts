import request from '@/services/axios/request';

export const deleteProjectApi = async (projectId: string) => {
    const response = await request.delete<void>(`/api/projects/${projectId}`);
    return response.data;
};
