import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
import { Project } from '../types/Project';
import { Link } from 'react-router-dom';
import ProjectCardMenu from './ProjectCardMenu';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <Card className=" shadow-none border-none">
            <CardContent className=" p-0 m-0 aspect-video rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
                {project.deploymentStatus === 'deployed' ? (
                    <Link to={project.url} target="_blank">
                        <img
                            src={project.previewImage}
                            alt="thumnail"
                            className="object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                        />
                    </Link>
                ) : (
                    <div className="w-full h-full flex justify-center items-center bg-red-400/10 text-red-400">
                        <p className="font-medium">Deployment Failed</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="mt-4">
                <div className="flex justify-between items-center w-full">
                    <div>
                        <div className="flex items-center gap-2">
                            <img
                                src="/logo.png"
                                alt="insthost log"
                                className="object-contain size-4 block"
                            />
                            <h3 className="text-md font-medium">
                                {project.name}
                            </h3>
                        </div>
                        <Link to={project.url} target="_blank">
                            <h5 className="text-sm text-gray-500 font-medium">
                                {project.url.split('://')[1]}
                            </h5>
                        </Link>
                    </div>
                    <ProjectCardMenu project={project} />
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProjectCard;
