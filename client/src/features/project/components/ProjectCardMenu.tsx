import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, ExternalLink, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types/Project';
import { ProjectDeleteAlertDialog } from './ProjectDeleteAlertDialog';
import { useState } from 'react';
type Props = { project: Project };
const ProjectCardMenu: React.FC<Props> = ({ project }) => {
    const [isOpenDeleteAlerttDialogOpen, setIsOpenDeleteAlerttDialogOpen] =
        useState(false);
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
                {/* <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Manage</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                    onClick={() => setIsOpenDeleteAlerttDialogOpen(true)}
                >
                    <Trash className="w-4 h-4 mr-2" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <ProjectDeleteAlertDialog
                projectId={project._id}
                open={isOpenDeleteAlerttDialogOpen}
                setOpen={setIsOpenDeleteAlerttDialogOpen}
            />
        </DropdownMenu>
    );
};

export default ProjectCardMenu;
