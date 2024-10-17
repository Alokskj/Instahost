import { useMutation } from '@tanstack/react-query';
import { updateProjectApi } from '../api/updateProjectApi';
import { Project } from '../types/Project';
import { queryClient } from '@/services/queryClient';

export const useUpdateProject = (projectId: string) => {
    const mutate = useMutation({
        mutationFn: (project: Project) => updateProjectApi(project),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects', projectId],
            });
        },
    });
    return mutate;
};
