import { useProjects } from '../hooks/useProjects';
import ProjectCreateCard from '../../project/components/ProjectCreateCard';
import ProjectCard from '../../project/components/ProjectCard';

const ProjectsSection = () => {
    const { data: projects } = useProjects();
    return (
        <div className="wrapper !max-w-screen-xl">
            <h2 className="text-3xl font-bold">Sites</h2>
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
