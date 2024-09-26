import { NextFunction, Request, Response } from 'express';
import fsPromises from 'node:fs/promises';
import DeploymentModel from '../models/deployment.model';
import ProjectModel from '../models/project.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { cloneProjectLocally } from '../utils/gitClone';
import publishDeploymentLog from '../utils/publishDeploymentLog';
import uploadFilesToS3 from '../services/uploadFilesToS3.service';
import { getLocalProjectDirPath } from '../utils/getLocalProjectDirPath';
import getDeploymentUrl from '../utils/getDeploymentUrl';

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

export const deployProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Extract projectId from request body
    const { projectId } = req.body;
    let deploymentId = '';

    try {
        // Find the project to check if it belongs to the current user
        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        });

        // If project not found, throw a 404 error
        if (!project) {
            throw new ApiError(404, 'Project not found');
        }

        // Create a deployment record for tracking
        const deployment = await DeploymentModel.create({
            projectId: project._id,
            status: 'PROGRESS',
        });

        // Store the deployment ID for potential error handling
        deploymentId = project._id.toString();

        publishDeploymentLog('Started...', deploymentId);
        // Clone the project locally
        await cloneProjectLocally(project.gitURL, project._id.toString());
        publishDeploymentLog('Project cloned successfully', deploymentId);

        const projectLocalDirPath = getLocalProjectDirPath(
            project._id.toString(),
        );
        console.log(projectLocalDirPath);

        // Get an array of project file paths
        const projectFiles = await fsPromises.readdir(projectLocalDirPath, {
            recursive: true,
        });
        console.log(projectFiles);

        publishDeploymentLog('Upload Started', deploymentId);

        // Upload files to S3
        await uploadFilesToS3(
            projectFiles,
            projectLocalDirPath,
            deploymentId,
            project._id.toString(),
        );

        publishDeploymentLog('Uploaded Successfully', deploymentId);

        // delete files locally
        await fsPromises.rm(projectLocalDirPath, { recursive: true });

        // Update deployment status to 'SUCCESS'
        deployment.status = 'SUCCESS';
        await deployment.save();
        publishDeploymentLog('Done.', deploymentId);

        // create deployment url
        const url = getDeploymentUrl(project.subDomain);

        // Send success response
        res.status(200).json(
            new ApiResponse(200, { url }, 'Files uploaded successfully'),
        );
    } catch (error) {
        // If there's a deployment ID and an error occurs, mark deployment as 'FAILED'
        if (deploymentId) {
            await DeploymentModel.findByIdAndUpdate(deploymentId, {
                $set: { status: 'FAILED' },
            });
            publishDeploymentLog(`Error : ${error}`, deploymentId);
        }
        // Pass the error to the next middleware
        next(error);
    }
};
