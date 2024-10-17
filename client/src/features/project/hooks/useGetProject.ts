import { useQuery } from '@tanstack/react-query';
import { getProjectApi } from '../api/getProjectApi';

export const useGetProject = (projectId: string) => {
    const response = useQuery({
        queryKey: ['projects', projectId],
        queryFn: () => getProjectApi(projectId),
        staleTime: 1000 * 60 * 60,
        enabled: !!projectId,
    });
    return response;
};
