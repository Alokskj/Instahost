import { useMutation } from '@tanstack/react-query';
import { uploadProjectZipApi } from '../api/uploadProjectZipApi';

export const useUploadProjectZip = () => {
    const mutation = useMutation({
        mutationFn: (data: { projectId: string; file: FormData }) => {
            return uploadProjectZipApi(data);
        },
    });
    return mutation;
};
