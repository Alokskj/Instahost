import { useMutation } from '@tanstack/react-query';
import { createProjectApi, createProjectBody } from '../api/createProjectApi';

export const useCreateProject = () => {
    const mutation = useMutation({
        mutationFn: (data: createProjectBody) => createProjectApi(data),
        mutationKey: ['projects'],
    });
    return mutation;
};
