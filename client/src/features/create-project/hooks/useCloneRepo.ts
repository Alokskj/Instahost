import { useMutation } from '@tanstack/react-query';
import { cloneRepoApi } from '../api/cloneRepoApi';

export const useCloneRepo = () => {
    const mutation = useMutation({
        mutationFn: (data: { projectId: string }) => {
            return cloneRepoApi(data);
        },
        mutationKey: ['projects'],
    });
    return mutation;
};
