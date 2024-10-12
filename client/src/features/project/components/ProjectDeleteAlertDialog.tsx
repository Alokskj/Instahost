import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteProject } from '@/features/project/hooks/useDeleteProject';
import { toast } from 'sonner';

export function ProjectDeleteAlertDialog({
    projectId,
    open,
    setOpen,
}: {
    projectId: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const { mutate, isPending } = useDeleteProject();
    const handleDelete = () => {
        mutate(projectId, {
            onSuccess: () => {
                setOpen(false);
                toast.success('Project deleted successfully');
            },
        });
    };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="w-11/12 sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your project and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
