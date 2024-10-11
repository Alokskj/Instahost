import request from '@/services/axios/request';
import { Project } from '../types/Project';

export const getProjectsApi = async () => {
    const response = await request.get<Project[]>('/api/projects');
    return response.data;
};
