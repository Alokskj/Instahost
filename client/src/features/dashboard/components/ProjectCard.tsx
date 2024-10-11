import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
import { Project } from '../types/Project';
import getDeploymentUrl from '../lib/getDeploymentUrl';
import { Link } from 'react-router-dom';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <Card className=" shadow-none border-none">
            <CardContent className=" p-0 m-0 aspect-video rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
                <Link to={getDeploymentUrl(project.subDomain)} target="_blank">
                    <img
                        src={project.previewImage}
                        alt="thumnail"
                        className="object-cover"
                    />
                </Link>
            </CardContent>
            <CardFooter className="mt-4">
                <div>
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="insthost log"
                            className="object-contain size-4 block"
                        />
                        <h3 className="text-md font-medium">{project.name}</h3>
                    </div>
                    <Link
                        to={getDeploymentUrl(project.subDomain)}
                        target="_blank"
                    >
                        <h5 className="text-sm text-gray-500 font-medium">
                            {
                                getDeploymentUrl(project.subDomain).split(
                                    '://',
                                )[1]
                            }
                        </h5>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProjectCard;
