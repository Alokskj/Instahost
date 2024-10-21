import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Analytics from './Analytics';
import Deployments from './Deployments';
import DomainSettings from './DomainSettings';
import EnvironmentVariables from './EnvironmentVariables';
import FileManagement from './FileManagement';
import GeneralSettings from './GeneralSettings';
import ProjectSettings from './ProjectSettings';
import { useProjectStore } from '../../store/useProjectStore';
import { useUpdateProject } from '../../hooks/useUpdateProject';
import { toast } from 'sonner';
import { useGetProject } from '../../hooks/useGetProject';
import { useParams } from 'react-router-dom';
import Spinner from '@/components/ui/spinner';
import { useEffect } from 'react';

export default function ProjectDashboard() {
    const { projectId } = useParams();
    const { data: fetchedProject } = useGetProject(projectId as string);
    const { project } = useProjectStore();
    const { mutateAsync: updateProject } = useUpdateProject();
    useEffect(() => {
        if (fetchedProject) {
            useProjectStore.setState({ project: fetchedProject });
        }
    }, [fetchedProject]);
    useEffect(() => {
        console.log(project);
    }, [project]);

    const handleSaveChanges = async () => {
        if (!project) return;
        try {
            console.log(project);
            await updateProject(project);
            toast.success('Project updated successfully');
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    if (!fetchedProject) return <Spinner />;

    return (
        <div className="container mx-auto p-4 mt-10">
            <h1 className="text-3xl font-bold mb-6">Manage Your Project</h1>
            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="domain">Domain</TabsTrigger>
                    {/* <TabsTrigger value="env">Environment</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger> */}
                    {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
                    {/* <TabsTrigger value="deployments">Deployments</TabsTrigger> */}
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <GeneralSettings />
                </TabsContent>
                <TabsContent value="domain">
                    <DomainSettings />
                </TabsContent>
                <TabsContent value="env">
                    <EnvironmentVariables />
                </TabsContent>
                <TabsContent value="files">
                    <FileManagement />
                </TabsContent>
                <TabsContent value="analytics">
                    <Analytics />
                </TabsContent>
                <TabsContent value="deployments">
                    <Deployments />
                </TabsContent>
                <TabsContent value="settings">
                    <ProjectSettings />
                </TabsContent>
            </Tabs>
            <div className="mt-6">
                <Button
                    onClick={handleSaveChanges}
                    disabled={
                        JSON.stringify(project) ===
                        JSON.stringify(fetchedProject)
                    }
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
