'use client';

import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function EnvironmentVariables() {
    const [envVars, setEnvVars] = useState('');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>
                    Manage your project's environment variables.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={envVars}
                    onChange={(e) => setEnvVars(e.target.value)}
                    placeholder="KEY=value"
                    rows={10}
                />
            </CardContent>
        </Card>
    );
}
