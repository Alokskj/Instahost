import { useQuery } from '@tanstack/react-query';
import { getProjectsApi } from '../api/getProjectsApi';

export const useProjects = () => {
    const response = useQuery({
        queryKey: ['projects'],
        queryFn: getProjectsApi,
        staleTime: 1000 * 60 * 60,
    });
    return response;
};
