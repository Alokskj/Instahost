import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { subdomainAvailableStatusApi } from '../../api/subdomainAvailableStatusApi';
import { useProjectStore } from '../../store/useProjectStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useUpdateProject } from '../../hooks/useUpdateProject';
import { useState } from 'react';

export default function DomainSettings() {
    const { project } = useProjectStore();
    const { mutateAsync } = useUpdateProject(project?._id);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const subdomainSchema = z.object({
        subdomain: z
            .string({ message: 'Subdomain is required' })
            .min(2, 'Subdomain length must be at least 2 characters')
            .regex(
                /^[a-z0-9-]+$/,
                'Subdomain can only contain lowercase letters, numbers, and hyphens',
            ),
    });
    const form = useForm({
        resolver: zodResolver(subdomainSchema),
        defaultValues: {
            subdomain: project?.subdomain,
        },
    });

    const checkIsSameSubdomain = (value: string) => {
        return value === project?.subdomain;
    };

    const handleSave = async (values: z.infer<typeof subdomainSchema>) => {
        if (checkIsSameSubdomain(values.subdomain)) {
            return;
        }
        const response = await subdomainAvailableStatusApi(values.subdomain);
        if (!response.available) {
            toast.error('Subdomain is not available');
        }
        await mutateAsync({ ...project, subdomain: values.subdomain });
        setIsDialogOpen(false);
        toast.success('Subdomain updated successfully');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Domain Settings</CardTitle>
                <CardDescription>
                    Manage your website's subdomain.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Current Subdomain</Label>
                    <p>{project?.subdomain + '.instahost.online'}</p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)}>
                    Update Subdomain
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Subdomain</DialogTitle>
                            <DialogDescription>
                                Choose a new subdomain for your project.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSave)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="subdomain"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subdomain</FormLabel>
                                            <FormControl>
                                                <div className="flex">
                                                    <Input
                                                        placeholder="your-subdomain"
                                                        {...field}
                                                        className="rounded-r-none"
                                                    />
                                                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                                                        .instahost.online
                                                    </span>
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={
                                        form.formState.isSubmitting ||
                                        checkIsSameSubdomain(
                                            form.getValues('subdomain'),
                                        )
                                    }
                                >
                                    Update
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
