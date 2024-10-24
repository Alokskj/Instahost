import { useQuery } from '@tanstack/react-query';
import { getAnalyticsApi } from '../api/getAnalyticsApi';

export const useAnalytics = (projectId: string) => {
    const response = useQuery({
        queryKey: ['analytics', projectId],
        queryFn: () => getAnalyticsApi(projectId),
        staleTime: 1000 * 60 * 60,
        refetchInterval: 5000,
    });
    return response;
};
