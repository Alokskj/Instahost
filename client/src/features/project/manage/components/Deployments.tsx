'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const deployments = [
    {
        id: 1,
        status: 'Success',
        commit: 'a1b2c3d',
        date: '2023-05-07 14:30:00',
    },
    { id: 2, status: 'Failed', commit: 'e4f5g6h', date: '2023-05-06 10:15:00' },
    {
        id: 3,
        status: 'Success',
        commit: 'i7j8k9l',
        date: '2023-05-05 18:45:00',
    },
];

export default function Deployments() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Deployment History</CardTitle>
                <CardDescription>
                    View and manage your project deployments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>

                            <TableHead>Commit</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deployments.map((deployment) => (
                            <TableRow key={deployment.id}>
                                <TableCell>
                                    <Badge
                                        variant={
                                            deployment.status === 'Success'
                                                ? 'success'
                                                : 'destructive'
                                        }
                                    >
                                        {deployment.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{deployment.commit}</TableCell>
                                <TableCell>{deployment.date}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">
                                        View Logs
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
