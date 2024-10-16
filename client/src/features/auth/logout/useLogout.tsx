import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from './logoutApi';

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ['user'] });
        },
    });

    return mutation;
};
