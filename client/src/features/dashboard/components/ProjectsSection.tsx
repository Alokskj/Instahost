import { useProjects } from '../../project/hooks/useProjects';
import ProjectCreateCard from '../../project/components/ProjectCreateCard';
import ProjectCard from '../../project/components/ProjectCard';
import Spinner from '@/components/ui/spinner';
import { useMaxProjectLimit } from '@/features/project/hooks/useMaxProjectLimit';

const ProjectsSection = () => {
    const { data: projects } = useProjects();
    const { maxProjectLimit, currentProjectCount } = useMaxProjectLimit();
    if (!projects) {
        return <Spinner />;
    }
    return (
        <div className="wrapper !max-w-screen-xl mt-16">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Sites</h2>
                <div>
                    <span className="font-bold text-xl">
                        {currentProjectCount}/{maxProjectLimit}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <ProjectCreateCard />
                {projects &&
                    projects?.map((project) => (
                        <ProjectCard project={project} />
                    ))}
            </div>
        </div>
    );
};

export default ProjectsSection;
