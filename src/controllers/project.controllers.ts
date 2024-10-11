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

export const createProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { gitURL, subDomain, name } = req.body;
        const isProjectExists = await ProjectModel.findOne({ name });
        if (isProjectExists) {
            throw new ApiError(400, 'This name is already taken.');
        }
        const project = await ProjectModel.create({
            name,
            gitURL,
            subDomain,
            userId: req.user,
        });
        res.status(201).json(new ApiResponse(201, project));
    },
);

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
    const projects = await ProjectModel.find({ userId: req.user });
    if (!projects) {
        throw new ApiError(404, 'No projects found');
    }
    res.status(200).json(
        new ApiResponse(200, projects, 'Projects retrieved successfully'),
    );
});

export const deployProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Extract projectId from request body
    const { projectId } = req.params;

    try {
        const project = await ProjectModel.findById(projectId);

        if (!project) {
            throw new ApiError(404, 'Project not found');
        }

        // Clone the project locally
        const clonePath = getLocalProjectDirPath(projectId);

        // Get an array of project file paths
        const projectFiles = await fsPromises.readdir(clonePath, {
            recursive: true,
        });

        // Upload files to S3
        await uploadFilesToS3(projectFiles, clonePath, projectId);

        // create deployment url
        const url = getDeploymentUrl(project.subDomain);

        // capture project screen shot
        const screenshotBuffer = await captureProjectScreenShot(url);
        // Upload screenshot to S3
        const screenshotUrl = await uploadImageToS3(
            screenshotBuffer,
            projectId,
        );

        // Update the project with the screenshot URL
        project.previewImage = screenshotUrl;
        await project.save();

        // delete files locally
        await fsPromises.rm(clonePath, { recursive: true });

        // Send success response
        res.status(200).json(
            new ApiResponse(200, { url }, 'Files uploaded successfully'),
        );
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

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
            new ApiResponse(200, null, 'Files uploaded successfully'),
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
        // Clone the project locally
        const clonePath = getLocalProjectDirPath(project._id.toString());

        await cloneProjectLocally(project.gitURL, clonePath);

        // update hosting type to 'git'
        project.hostingType === 'git';
        await project.save();

        res.status(200).json(
            new ApiResponse(200, null, 'Files uploaded successfully'),
        );
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
