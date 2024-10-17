import request from '@/services/axios/request';
import { Project } from '../types/Project';

export const getProjectApi = async (projectId: string) => {
    const response = await request.get<Project>(`/api/projects/${projectId}`);
    return response.data;
};
