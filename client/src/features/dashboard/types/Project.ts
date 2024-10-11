export type Project = {
    _id: string;
    subDomain: string;
    customDomain: string;
    gitURL: string;
    name: string;
    userId: string;
    hostingType: 'git' | 'file';
    deploymentStatus: 'deployed' | 'pending' | 'failed';
    previewImage: string;
};
