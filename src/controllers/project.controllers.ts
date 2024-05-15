import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import ProjectModel from '../models/project.model';
import { ApiError } from '../utils/ApiError';
import _config from '../config/_config';
import { ApiResponse } from '../utils/ApiResponse';
import { cloneProjectLocally } from '../utils/gitClone';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import mime from 'mime';
import s3Client from '../config/s3Client';
import DeploymentModel from '../models/deployment.model';
import pLimit from 'p-limit';
import publishDeploymentLog from '../utils/publishDeploymentLog';
export const createProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { gitURL, name } = req.body;
        const isProjectExists = await ProjectModel.findOne({ name });
        if (isProjectExists) {
            throw new ApiError(400, 'This name is already taken.');
        }
        const project = await ProjectModel.create({
            name,
            gitURL,
            subDomain: name,
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

        // Define the local directory path of the project
        const projectLocalDirPath = path.join(
            __dirname,
            '../../',
            'public/websites',
            project._id.toString(),
        );

        // Get an array of project file paths
        const projectFiles = await fsPromises.readdir(projectLocalDirPath, {
            recursive: true,
        });
        // set concurrency limit
        const limit = pLimit(100);
        publishDeploymentLog('Upload Started', deploymentId);

        // Upload each file to AWS S3 bucket concurrently
        const uploadPromises = projectFiles.map(async (file) => {
            const filePath = path.join(projectLocalDirPath, file.toString());

            // Skip if it's a directory
            if (fs.lstatSync(filePath).isDirectory()) return;

            // Normalize file path separators (replace \ with /)
            const normalizedFilePath = file.toString().replace(/\\/g, '/');

            publishDeploymentLog(
                `Uploading ${normalizedFilePath}`,
                deploymentId,
            );

            // Create an upload command for AWS S3
            const uploadCommand = new PutObjectCommand({
                Bucket: _config.awsS3BucketName,
                Key: `__websites/${project._id}/${normalizedFilePath}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath),
            });

            // Execute the upload command
            return limit(() => s3Client.send(uploadCommand));
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);
        publishDeploymentLog('Uploaded Successfully', deploymentId);

        // delete files locally
        await fsPromises.rm(projectLocalDirPath, { recursive: true });

        // Update deployment status to 'SUCCESS'
        deployment.status = 'SUCCESS';
        await deployment.save();
        publishDeploymentLog('Done.', deploymentId);
        // Send success response
        res.status(200).json(
            new ApiResponse(200, undefined, 'Files uploaded successfully'),
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
