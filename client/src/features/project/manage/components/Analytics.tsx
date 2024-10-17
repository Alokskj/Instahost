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

const analyticsData = [
    { date: '2023-05-01', visits: 100 },
    { date: '2023-05-02', visits: 120 },
    { date: '2023-05-03', visits: 150 },
    { date: '2023-05-04', visits: 180 },
    { date: '2023-05-05', visits: 200 },
    { date: '2023-05-06', visits: 220 },
    { date: '2023-05-07', visits: 190 },
];

export default function Analytics() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
                <CardDescription>
                    View your website's visit statistics.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        visits: {
                            label: 'Visits',
                            color: 'hsl(var(--chart-1))',
                        },
                    }}
                    className="h-[300px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="visits"
                                stroke="var(--color-visits)"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
