import request from '@/services/axios/request';

export const uploadProjectZipApi = async (data: {
    projectId: string;
    file: FormData;
}) => {
    try {
        const response = await request.post<void>(
            `/api/projects/${data.projectId}/upload-files`,
            data.file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
