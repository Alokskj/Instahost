import request from '@/services/axios/request';

export const subdomainAvailableStatusApi = async (subdomain: string) => {
    const response = await request.get<{ available: boolean }>(
        `/api/projects/subdomain/check/?subdomain=${subdomain}`,
    );
    return response.data;
};
