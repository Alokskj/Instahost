import { useQuery } from '@tanstack/react-query';
import { loadUserApi } from './loadUserApi';

export const useUser = () => {
    const response = useQuery({
        queryKey: ['user'],
        queryFn: loadUserApi,
        retry: false,
        staleTime: 1000 * 60 * 60,
    });
    return response;
};
