import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useProjectStore } from '../../store/useProjectStore';
import { Project } from '../../types/Project';

export default function ProjectSettings() {
    const { project } = useProjectStore();
    const handleDeactivateProject = () => {
        useProjectStore.setState({
            project: { ...(project as Project), active: !project?.active },
        });
    };

    const handleDeleteProject = () => {
        if (!project) return;
        useProjectStore.setState({ isDeleteDialogOpen: true });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>
                    Manage your project's advanced settings.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>Project Status</Label>
                        <p className="text-sm text-muted-foreground">
                            {project?.active ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                    <Switch
                        checked={project?.active}
                        onCheckedChange={handleDeactivateProject}
                    />
                </div>
                <div className="pt-4">
                    <Button variant="destructive" onClick={handleDeleteProject}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Project
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
