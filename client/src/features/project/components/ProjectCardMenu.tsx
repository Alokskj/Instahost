import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, ExternalLink, Settings, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types/Project';
import { useProjectStore } from '../store/useProjectStore';
type Props = { project: Project };
const ProjectCardMenu: React.FC<Props> = ({ project }) => {
    const { setProject, setIsDeleteDialogOpen } = useProjectStore();
    const handleDeleteClick = () => {
        setProject(project);
        setIsDeleteDialogOpen(true);
    };
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} size={'icon'}>
                    <Ellipsis className="w-4 h-4 " />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="w-48">
                <DropdownMenuItem asChild>
                    <Link
                        to={project.url}
                        className="cursor-pointer"
                        target="_blank"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <span>Visit</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={`/dashboard/projects/${project._id}/manage`}>
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Manage</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDeleteClick}
                    className="cursor-pointer"
                >
                    <Trash className="w-4 h-4 mr-2" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProjectCardMenu;
