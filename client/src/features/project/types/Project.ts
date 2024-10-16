export type Project = {
    _id: string;
    subDomain: string;
    customDomain: string;
    name: string;
    userId: string;
    deploymentStatus: 'deployed' | 'pending' | 'failed';
    previewImage: string;
    url: string;
};
