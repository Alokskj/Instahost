import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, Loader2, ArrowLeft } from 'lucide-react';

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
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    createProject,
    createProjectSchema,
} from './schema/createProjectSchema';
import { useCreateProject } from './hooks/useCreateProject';
import { useCloneRepo } from './hooks/useCloneRepo';
import { useCreateDeployment } from './hooks/useCreateDeployment';
import { useUploadProjectZip } from './hooks/useuploadProjectZip';

export default function CreateProject() {
    const [isDeploying, setIsDeploying] = useState(false);
    const { state } = useLocation();
    const [zipFile, setZipFile] = useState<File | null>(state?.zipFile || null);
    const navigate = useNavigate();
    const { mutateAsync: createProject } = useCreateProject();
    const { mutateAsync: cloneRepo } = useCloneRepo();
    const { mutateAsync: deployProject } = useCreateDeployment();
    const { mutateAsync: uploadProjectZip } = useUploadProjectZip();
    const form = useForm<createProject>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            projectType: state?.projectType || 'zip',
            gitUrl: state?.gitUrl || '',
            projectName: '',
            subdomain: '',
        },
    });

    const handleZipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        // Validate if a file is selected
        if (!file) {
            toast.error('No file selected', {
                description: 'Please select a ZIP file to upload.',
            });
            return;
        }

        // Check for valid file types
        const validMimeTypes = [
            'application/zip',
            'application/x-zip-compressed',
            'application/x-zip',
        ];

        if (!validMimeTypes.includes(file.type)) {
            toast.error('Invalid file type', {
                description: 'Please upload a ZIP file.',
            });
            return;
        }

        // Check for file size (e.g., limit to 10MB)
        const maxSizeInBytes = 100 * 1024 * 1024; // 100 MB
        if (file.size > maxSizeInBytes) {
            toast.error('File too large', {
                description: 'Please upload a ZIP file smaller than 10 MB.',
            });
            return;
        }

        // If all validations pass, set the ZIP file
        setZipFile(file);
    };

    const onSubmit = async (values: createProject) => {
        if (values.projectType === 'zip' && !zipFile) {
            toast.error('Missing ZIP file', {
                description: 'Please upload a ZIP file of your project.',
            });
            return;
        }
        if (values.projectType === 'git' && !values.gitUrl) {
            form.setError('gitUrl', {
                message: 'Git URL is required',
            });
            return;
        }

        setIsDeploying(true);

        try {
            // create new project
            const project = await createProject({
                name: values.projectName,
                gitURL: values.gitUrl,
                subDomain: values.subdomain,
            });
            // clone repo files
            if (values.projectType === 'git') {
                await cloneRepo({ projectId: project?._id as string });
            } else {
                const formData = new FormData();
                formData.append('file', zipFile as File);
                await uploadProjectZip({
                    projectId: project?._id as string,
                    file: formData,
                });
            }

            // deploy project
            await deployProject({
                projectId: project?._id as string,
            });

            toast('Project deployed successfully!', {
                description: `Your project "${
                    values.projectName
                }" is now live at ${values.subdomain}.${
                    import.meta.env.VITE_HOST
                }`,
            });
            navigate('/dashboard', { replace: true });
        } catch (error: any) {
            console.error('Error deploying project:', error);
            toast.error('Deployment failed', {
                description: error.message,
            });
        } finally {
            setIsDeploying(false);
        }
    };

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-6"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Button>

            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Create New Project</h1>
                <p className="text-muted-foreground">
                    Deploy your static website in minutes
                </p>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Source</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
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
                                                    <RadioGroupItem value="zip" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Upload ZIP
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.watch('projectType') === 'git' && (
                            <FormField
                                control={form.control}
                                name="gitUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Git Repository URL
                                        </FormLabel>
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

                        {form.watch('projectType') === 'zip' && (
                            <FormItem>
                                <FormLabel>Upload Project ZIP</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".zip"
                                        onChange={handleZipUpload}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {zipFile ? (
                                        <p>Selected zip: {zipFile.name}</p>
                                    ) : (
                                        'Upload a ZIP file containing your project files.'
                                    )}
                                </FormDescription>
                            </FormItem>
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
                                                .alokskj.tech
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

                        {isDeploying && (
                            <>
                                <Alert>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <AlertTitle>
                                        Deploying your project
                                    </AlertTitle>
                                    <AlertDescription>
                                        This may take a few minutes. Please
                                        don't close this page.
                                    </AlertDescription>
                                </Alert>
                            </>
                        )}

                        <Button
                            type="submit"
                            disabled={isDeploying}
                            className="w-full"
                        >
                            {isDeploying ? (
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

                <div className="text-sm text-muted-foreground">
                    <p>
                        Need help? Check out our{' '}
                        <a href="#" className="underline">
                            deployment guide
                        </a>{' '}
                        or{' '}
                        <a href="#" className="contact support">
                            contact support
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
