import request from '@/services/axios/request';
import { Project } from '../types/Project';

export const updateProjectApi = async (project: Project) => {
    const response = await request.patch<void>(
        `/api/projects/${project._id}`,
        project,
    );
    return response.data;
};
