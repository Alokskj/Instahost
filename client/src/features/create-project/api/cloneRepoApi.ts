import request from '@/services/axios/request';

export const cloneRepoApi = async (data: { projectId: string }) => {
    const response = await request.post<void>(
        `/api/projects/${data.projectId}/clone-files`,
        {},
    );
    return response.data;
};
