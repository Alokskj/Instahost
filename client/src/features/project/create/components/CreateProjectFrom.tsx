import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Loader2,
    Upload,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import FolderUpload from './FolderUpload';
import {
    createProjectSchema,
    CreateProject,
} from '../schema/createProjectSchema';
import { queryClient } from '@/services/queryClient';
import { toast } from 'sonner';
import { useCreateDeployment } from '../../hooks/useCreateDeployment';
import { useCreateProject } from '../../hooks/useCreateProject';
import { useCloneRepo } from '../hooks/useCloneRepo';
import { useUploadProjectZip } from '../hooks/useUploadProjectZip';
import { useNavigate } from 'react-router-dom';
import { useCreateProjectStore } from '../store/useStore';
import DeploymentGuide from './DeploymentGuide';



export default function CreateProjectForm() {
    const { project, setProject, initialState } = useCreateProjectStore();
    const form = useForm<CreateProject>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: project,
    });
    const navigate = useNavigate();
    const { mutateAsync: createProject } = useCreateProject();
    const { mutateAsync: cloneRepo } = useCloneRepo();
    const { mutateAsync: deployProject } = useCreateDeployment();
    const { mutateAsync: uploadProjectZip } = useUploadProjectZip();

    const onSubmit = async (values: CreateProject) => {
        if (values.hostingType === 'file' && !values.zipFile) {
            form.setError('zipFile', {
                message: 'File is required',
            });
            return;
        }

        if (values.hostingType === 'git' && !values.gitURL) {
            form.setError('gitURL', {
                message: 'Git URL is required',
            });
            return;
        }

        try {
            // create new project
            const project = await createProject({
                name: values.projectName,
                gitURL: values.gitURL as string,
                subdomain: values.subdomain,
            });
            // clone repo files
            if (values.hostingType === 'git') {
                await cloneRepo({ projectId: project?._id as string });
            } else {
                const formData = new FormData();
                formData.append('file', values.zipFile as File);
                await uploadProjectZip({
                    projectId: project?._id as string,
                    file: formData,
                });
            }
            // deploy project
            await deployProject({
                projectId: project?._id as string,
            });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast('Project deployed successfully!');
            setProject(initialState);
            navigate('/dashboard', { replace: true });
        } catch (error: any) {
            console.error('Error deploying project:', error);
            toast.error(error.message);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="hostingType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Source</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="git" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Git Repository
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="file" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Upload Files
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.watch('hostingType') === 'git' && (
                    <FormField
                        control={form.control}
                        name="gitURL"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Git Repository URL</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://github.com/username/repo.git"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Enter the URL of your Git repository
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <DeploymentGuide />

                {form.watch('hostingType') === 'file' && (
                    <FormField
                        control={form.control}
                        name="zipFile"
                        render={() => (
                            <FormItem>
                                <FormLabel>Upload Project Files</FormLabel>
                                <FormControl>
                                    <FolderUpload form={form} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="My Awesome Project"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Choose a name for your project
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subdomain"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subdomain</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    <Input
                                        placeholder="my-project"
                                        {...field}
                                        className="rounded-r-none"
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                                        .instahost.live
                                    </span>
                                </div>
                            </FormControl>
                            <FormDescription>
                                Choose a subdomain for your project
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.formState.isSubmitting && (
                    <Alert>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <AlertTitle>Deploying your project</AlertTitle>
                        <AlertDescription>
                            This may take a few minutes. Please don't close this
                            page.
                        </AlertDescription>
                    </Alert>
                )}

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                >
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deploying...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Deploy Project
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
}
