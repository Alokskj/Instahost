import request from '@/services/axios/request';

export const deployProjectApi = async (data: { projectId: string }) => {
    const response = await request.post<{ url: string }>(
        `/api/projects/${data.projectId}/deploy`,
        {},
    );
    return response.data;
};
