import { useMutation } from '@tanstack/react-query';
import { loginApi } from './loginApi';
import { Login } from './types';

export const useLogin = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: (data: Login) => loginApi(data),
    });

    return { mutate, isPending };
};
