import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

const NewProjectCard = () => {
    return (
        <Card className="overflow-hidden cursor-pointer aspect-video">
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

export default NewProjectCard;
