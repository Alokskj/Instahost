'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useAnalytics } from '../hooks/useAnalytics';
import { useProjectStore } from '../../store/useProjectStore';

export default function Analytics() {
    const { project } = useProjectStore();
    const { data } = useAnalytics(project._id);
    const analyticsData = data?.analytics.dailyVisits.map((d) => ({
        ...d,
        date: new Date(d.date).toLocaleDateString(),
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                    View your website's visit statistics.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        visits: {
                            label: 'Visits',
                            color: '#F2B713',
                        },
                    }}
                    className="h-[300px] w-full "
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis width={20} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="visits"
                                stroke="#F2B713"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
