import { useMutation } from '@tanstack/react-query';
import { deleteProjectApi } from '../api/deleteProjectApi';
import { queryClient } from '@/services/queryClient';

export const useDeleteProject = () => {
    const mutation = useMutation({
        mutationFn: (projectId: string) => deleteProjectApi(projectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
    return mutation;
};
