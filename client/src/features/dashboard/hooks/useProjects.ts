import { useQuery } from '@tanstack/react-query';
import { getProjectsApi } from '../api/getProjectsApi';

export const useProjects = () => {
    const response = useQuery({
        queryKey: ['projects'],
        queryFn: getProjectsApi,
    });
    return response;
};
