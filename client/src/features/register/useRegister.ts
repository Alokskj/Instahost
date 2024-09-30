import { useMutation } from '@tanstack/react-query';
import { registerApi } from './RegisterApi';
import { Register } from './types';

export const useRegister = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: (data: Register) => registerApi(data),
    });

    return { mutate, isPending };
};
