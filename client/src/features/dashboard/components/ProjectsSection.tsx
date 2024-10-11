import { useProjects } from '../hooks/useProjects';
import NewProjectCard from './NewProjectCard';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
    const { data: projects } = useProjects();
    return (
        <div className="wrapper !max-w-screen-xl">
            <h2 className="text-3xl font-bold">Sites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <NewProjectCard />
                {projects &&
                    projects?.map((project) => (
                        <ProjectCard project={project} />
                    ))}
            </div>
        </div>
    );
};

export default ProjectsSection;
