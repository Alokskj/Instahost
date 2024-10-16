import { useMutation } from '@tanstack/react-query';
import { ResendMail } from './types';
import { resendMailApi } from './resendMailApi';

export const useResendMail = () => {
    const mutation = useMutation({
        mutationFn: (data: ResendMail) => resendMailApi(data),
    });
    return mutation;
};
