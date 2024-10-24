import { NextFunction, Request, Response } from 'express';
import fsPromises from 'node:fs/promises';
import ProjectModel from '../models/project.model';
import { ApiError } from '../lib/utils/ApiError';
import { ApiResponse } from '../lib/utils/ApiResponse';
import { asyncHandler } from '../lib/utils/asyncHandler';
import { cloneProjectLocally } from '../lib/helpers/gitClone';
import uploadFilesToS3 from '../services/uploadFilesToS3.service';
import { getLocalProjectDirPath } from '../lib/utils/getLocalProjectDirPath';
import getDeploymentUrl from '../lib/utils/getDeploymentUrl';
import { checkDomainCnameRecord } from '../lib/utils/checkDomainCnameRecord';
import { captureProjectScreenShot } from '../lib/helpers/captureProjectScreenShot';
import { uploadImageToS3 } from '../services/uploadImageToS3.service';
import { deleteFilesFromS3 } from '../services/deleteFilesFromS3.service';
import _config from '../config/_config';

export const createProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { gitURL, subdomain, name } = req.body;
        const maxFreeProjectLimit = parseInt(_config.maxFreeProjectLimit, 10);

        // Check if user is a free plan user
        if (req.user?.plan === 'free') {
            // Get count of user's projects
            const userProjectCount = await ProjectModel.countDocuments({
                userId: req.user,
            });

            // Check if the user has reached the max project limit for free plan
            if (userProjectCount >= maxFreeProjectLimit) {
                throw new ApiError(
                    403,
                    `Free plan users can only create up to ${maxFreeProjectLimit} projects. Upgrade your plan to create more projects.`,
                );
            }
        }

        // Check if the subdomain is already taken
        const isProjectExists = await ProjectModel.findOne({ subdomain });
        if (isProjectExists) {
            throw new ApiError(
                400,
                'This subdomain is already taken. Please enter a different subdomain',
            );
        }

        // Create a new project
        const project = await ProjectModel.create({
            name,
            gitURL,
            subdomain,
            userId: req.user,
        });

        res.status(201).json(
            new ApiResponse(
                201,
                { _id: project._id },
                'Project created successfully',
            ),
        );
    },
);

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
    const projects = await ProjectModel.find({ userId: req.user })
        .sort({ createdAt: -1 })
        .lean();
    if (!projects) {
        throw new ApiError(404, 'No projects found');
    }
    const projectsWithUrl = projects.map((project) => {
        return {
            ...project,
            url: getDeploymentUrl(project.subdomain),
            subdomain: project.subdomain + '.' + _config.host,
        };
    });
    res.status(200).json(
        new ApiResponse(
            200,
            projectsWithUrl,
            'Projects retrieved successfully',
        ),
    );
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const project = await ProjectModel.findOne({
        _id: projectId,
        userId: req.user,
    }).lean();
    if (!project) {
        throw new ApiError(404, 'Project not found');
    }
    const url = getDeploymentUrl(project.subdomain);

    res.status(200).json(
        new ApiResponse(
            200,
            { ...project, url },
            'Project retrieved successfully',
        ),
    );
});

export const updateProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const { name, active, subdomain } = req.body;
        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        });
        if (!project) {
            throw new ApiError(404, 'Project not found');
        }
        if (subdomain) {
            const isDomainAlreadyLinked = await ProjectModel.exists({
                subdomain,
                userId: { $ne: req.user },
            });
            if (isDomainAlreadyLinked) {
                throw new ApiError(
                    400,
                    'SubDomain already linked with another project',
                );
            }
        }

        project.name = name || project.name;
        project.active = active;
        project.subdomain = subdomain || project.subdomain;
        const updatedProject = await project.save();
        res.status(200).json(
            new ApiResponse(
                200,
                updatedProject,
                'Project updated successfully',
            ),
        );
    },
);

export const deleteProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.params;

        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        });

        if (!project) {
            throw new ApiError(404, 'Project not found');
        }
        // Delete project files from S3
        await deleteFilesFromS3(projectId);

        // // Remove the project from the database
        await ProjectModel.findByIdAndDelete(project._id);

        res.status(200).json(
            new ApiResponse(200, null, 'Project deleted successfully'),
        );
    },
);

export const deployProject = asyncHandler(
    async (req: Request, res: Response) => {
        // Extract projectId from request body
        const { projectId } = req.params;
        const project = await ProjectModel.findById(projectId);

        if (!project) {
            throw new ApiError(404, 'Project not found');
        }

        try {
            // Clone the project locally
            const clonePath = getLocalProjectDirPath(projectId);

            // Get an array of project file paths
            const projectFiles = await fsPromises.readdir(clonePath, {
                recursive: true,
            });

            // Upload files to S3
            await uploadFilesToS3(projectFiles, clonePath, projectId);

            // delete files locally
            await fsPromises.rm(clonePath, { recursive: true });

            // create deployment url
            const url = getDeploymentUrl(project.subdomain);

            // capture project screen shot
            const screenshotBuffer = await captureProjectScreenShot(url);
            // Upload screenshot to S3
            const screenshotUrl = await uploadImageToS3(
                screenshotBuffer,
                projectId,
            );

            // Update the project with the screenshot URL
            project.previewImage = screenshotUrl;

            // Update the project deployment status to 'deployed'
            project.deploymentStatus = 'deployed';

            await project.save();

            // Send success response
            res.status(200).json(
                new ApiResponse(200, { url }, 'Project deployed successfully'),
            );
        } catch (error) {
            // Update the project deployment status to failed
            project.deploymentStatus = 'failed';
            await project.save();
            throw error;
        }
    },
);

export const uploadProjectFiles = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        });

        // If project not found, throw a 404 error
        if (!project) {
            throw new ApiError(404, 'Project not found');
        }

        res.status(200).json(
            new ApiResponse(200, null, 'Files uploaded locally successfully'),
        );
    },
);

export const cloneProjectFiles = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        });
        // If project not found, throw a 404 error
        if (!project) {
            throw new ApiError(404, 'Project not found');
        }
        try {
            // Clone the project locally
            const clonePath = getLocalProjectDirPath(project._id.toString());

            await cloneProjectLocally(project.gitURL, clonePath);

            // update hosting type to 'git'
            project.hostingType === 'git';
            await project.save();
            res.status(200).json(
                new ApiResponse(200, null, 'Files cloned locally successfully'),
            );
        } catch (error) {
            // Update the project deployment status to failed
            project.deploymentStatus = 'failed';
            await project.save();
            throw error;
        }
    },
);

export const addDomain = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { customDomain } = req.body;

    // check if domain already linked with another project
    const isDomainAlreadyLinked = await ProjectModel.exists({
        customDomain,
        userId: { $ne: req.user },
    });
    if (isDomainAlreadyLinked) {
        throw new ApiError(400, 'Domain already linked with another project');
    }

    const project = await ProjectModel.findOne({
        _id: projectId,
        userId: req.user,
    });
    // If project not found, throw a 404 error
    if (!project) {
        throw new ApiError(404, 'Project not found');
    }

    project.customDomain = customDomain;
    const updatedProject = await project.save();
    res.status(200).json(
        new ApiResponse(200, updatedProject, 'Domain added successfully'),
    );
});

export const verifyDomainOwnership = asyncHandler(
    async (req: Request, res: Response) => {
        const { domain } = req.params;
        const isVerified = await checkDomainCnameRecord(domain);
        if (!isVerified) {
            throw new ApiError(404, 'Domain could not be verified');
        }
        res.status(200).json(
            new ApiResponse(200, null, 'Domain verified successfully'),
        );
    },
);

export const checkSubdomainAvailability = asyncHandler(
    async (req: Request, res: Response) => {
        const { subdomain } = req.query;
        const isProjectExists = await ProjectModel.exists({
            subdomain: subdomain,
        });

        res.status(200).json(
            new ApiResponse(
                200,
                { available: !isProjectExists },
                'Domain available successfully',
            ),
        );
    },
);

export const updateSubdomain = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const { subdomain } = req.body;
        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        });
        // If project not found, throw a 404 error
        if (!project) {
            throw new ApiError(404, 'Project not found');
        }
        project.subdomain = subdomain;
        await project.save();
        res.status(200).json(
            new ApiResponse(200, null, 'Subdomain updated successfully'),
        );
    },
);

export const getAnalytics = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const projectAnalytics = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        }).select('analytics');
        if (!projectAnalytics) {
            throw new ApiError(404, 'Project not found');
        }
        res.status(200).json(
            new ApiResponse(
                200,
                projectAnalytics,
                'Project analytics retrieved successfully',
            ),
        );
    },
);
