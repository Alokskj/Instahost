import { useQuery } from '@tanstack/react-query';
import { subdomainAvailableStatusApi } from '../api/subdomainAvailableStatusApi';

export const useSubdomainAvailableStatus = (subdomain: string) => {
    const response = useQuery({
        queryKey: [subdomain],
        queryFn: () => subdomainAvailableStatusApi(subdomain),
    });
    return response;
};
