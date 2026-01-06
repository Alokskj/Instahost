import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CreateProjectForm from '@/features/project/create/components/CreateProjectFrom';
import { useMaxProjectLimit } from '@/features/project/hooks/useMaxProjectLimit';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function CreateProject() {
    const navigate = useNavigate();
    const { isMaxProjectLimitReached } = useMaxProjectLimit();
    useEffect(() => {
        if (isMaxProjectLimitReached) {
            toast.error(
                'You have reached the free project limit. Please upgrade your plan to create more projects.',
                { id: 'maxFreeProjectLimit' },
            );
            navigate('/dashboard');
        }
    }, [isMaxProjectLimitReached, navigate]);
    return (
        <div className="wrapper py-10 !max-w-4xl">
            <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="mb-6"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Create New Project</h1>
               

                <CreateProjectForm />

                <div className="text-sm text-muted-foreground">
                    <p>
                        Need help? Check out our{' '}
                        <a href="#deployment-guide" className="underline">
                            deployment guide
                        </a>{' '}
                        or{' '}
                        <a href="mailto:alokskj14@gmail.com" className="contact support underline">
                            contact support
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
