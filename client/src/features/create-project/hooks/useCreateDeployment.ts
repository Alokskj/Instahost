import { useMutation } from '@tanstack/react-query';
import { deployProjectApi } from '../api/deployProjectApi';

export const useCreateDeployment = () => {
    const mutation = useMutation({
        mutationFn: (data: { projectId: string }) => deployProjectApi(data),
        mutationKey: ['projects'],
    });
    return mutation;
};
