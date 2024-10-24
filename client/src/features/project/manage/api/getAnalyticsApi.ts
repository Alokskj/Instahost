import request from '@/services/axios/request';
interface IAnalytics {
    analytics: {
        dailyVisits: {
            date: Date;
            visits: number;
        }[];
    };
}
export const getAnalyticsApi = async (projectId: string) => {
    const response = await request.get<IAnalytics>(
        `/api/projects/${projectId}/analytics`,
    );
    return response.data;
};
