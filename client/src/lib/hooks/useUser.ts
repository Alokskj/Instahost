import { useQuery } from '@tanstack/react-query';
import { loadUserApi } from '../api/loadUserApi';

export const useUser = () => {
    const response = useQuery({
        queryKey: ['user'],
        queryFn: loadUserApi,
        retry: false,
    });
    return response;
};
