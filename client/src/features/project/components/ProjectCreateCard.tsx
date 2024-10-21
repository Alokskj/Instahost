import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMaxProjectLimit } from '../hooks/useMaxProjectLimit';

const ProjectCreateCard = () => {
    const navigate = useNavigate();
    const { isMaxProjectLimitReached } = useMaxProjectLimit();
    const handleClick = () => {
        if (isMaxProjectLimitReached) {
            return toast.error(
                'You have reached the free project limit. Please upgrade your plan to create more projects.',
                {
                    id: 'maxFreeProjectLimit',
                },
            );
        }
        navigate('/dashboard/projects/create');
    };
    return (
        <Card
            className="overflow-hidden cursor-pointer aspect-video"
            onClick={handleClick}
        >
            <CardContent className="w-full h-full p-0 m-0">
                <div className="w-full h-full  flex justify-center items-center">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Plus className="text-xl" />
                        New Project
                    </h3>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectCreateCard;
