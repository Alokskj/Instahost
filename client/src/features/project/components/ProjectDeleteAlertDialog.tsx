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
import { useProjectStore } from '../store/useProjectStore';
import { useNavigate } from 'react-router-dom';

export function ProjectDeleteAlertDialog() {
    const { mutate, isPending } = useDeleteProject();
    const { project, isDeleteDialogOpen } = useProjectStore();
    const navigate = useNavigate();
    const handleClose = () => {
        useProjectStore.setState({
            isDeleteDialogOpen: false,
        });
    };
    const handleDelete = () => {
        if (!project) return;
        mutate(project._id, {
            onSuccess: () => {
                toast.success('Project deleted successfully');
                navigate('/dashboard', { replace: true });
                handleClose();
            },
        });
    };

    return (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={handleClose}>
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
                        disabled={isPending || !project}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
