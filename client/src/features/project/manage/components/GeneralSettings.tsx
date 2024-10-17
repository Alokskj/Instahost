import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

import { toast } from 'sonner';
import { useProjectStore } from '../../store/useProjectStore';

export default function GeneralSettings() {
    const { project } = useProjectStore();
    const handleCopyClick = () => {
        navigator.clipboard.writeText(project?.url as string);
        toast.success('Project URL copied to clipboard.');
    };
    const isDeployed = project?.deploymentStatus === 'deployed';
    return (
        <Card>
            <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                    Manage your project's basic information.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                        id="projectName"
                        value={project?.name}
                        onChange={(e) =>
                            useProjectStore.setState({
                                project: { ...project, name: e.target.value },
                            })
                        }
                    />
                </div>
                <Alert variant={isDeployed ? 'default' : 'destructive'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Deployment Status</AlertTitle>
                    <AlertDescription>
                        {isDeployed
                            ? 'Your project is currently deployed.'
                            : 'Your project deplyment has failed.'}
                    </AlertDescription>
                </Alert>
                <div className="space-y-2">
                    <Label>Project URL</Label>
                    <div className="flex items-center space-x-2">
                        <Input value={project?.url} readOnly />
                        <Button variant="outline" onClick={handleCopyClick}>
                            Copy
                        </Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Last Deployment</Label>
                    <p>
                        {new Date(project?.updatedAt as Date).toLocaleString()}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
