import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CreateProjectForm from '@/features/project/create/components/CreateProjectFrom';

export default function CreateProject() {
    const navigate = useNavigate();

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
                <p className="text-muted-foreground">
                    Deploy your static website in minutes
                </p>

                <CreateProjectForm />

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
