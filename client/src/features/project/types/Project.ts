export type Project = {
    _id: string;
    subdomain: string;
    customDomain?: string;
    gitURL?: string;
    name: string;
    userId: string;
    hostingType: 'git' | 'file';
    deploymentStatus: 'deployed' | 'pending' | 'failed';
    previewImage: string;
    url: string;
    active: boolean;
    analytics: {
        dailyVisits: {
            date: Date;
            visitCount: number;
        }[];
    };
    createdAt: Date;
    updatedAt: Date;
};
