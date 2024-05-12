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
import mime from 'mime';
import s3Client from '../config/s3Client';
import DeploymentModel from '../models/deployment.model';
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
            subDomain: `${name}.${_config.proxyServerDomain}`,
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
    let deploymentId;

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
        deploymentId = deployment._id;

        // Clone the project locally
        await cloneProjectLocally(project.gitURL, project._id.toString());

        // Define the local directory path of the project
        const projectLocalDirPath = path.join(
            __dirname,
            '../../',
            'public/websites',
            project._id.toString(),
        );

        // Get an array of project file paths
        const projectFiles = fs.readdirSync(projectLocalDirPath, {
            recursive: true,
        });

        // Upload each file to AWS S3 bucket
        for (const file of projectFiles) {
            const filePath = path.join(projectLocalDirPath, file.toString());

            // Skip if it's a directory
            if (fs.lstatSync(filePath).isDirectory()) continue;

            // Normalize file path separators (replace \ with /)
            const normalizedFilePath = file.toString().replace(/\\/g, '/');

            console.log('Uploading', normalizedFilePath);

            // Create an upload command for AWS S3
            const uploadCommand = new PutObjectCommand({
                Bucket: _config.awsS3BucketName,
                Key: `__websites/${project._id}/${normalizedFilePath}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath),
            });

            // Execute the upload command
            await s3Client.send(uploadCommand);
        }

        // Update deployment status to 'SUCCESS'
        deployment.status = 'SUCCESS';
        await deployment.save();

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
        }
        // Pass the error to the next middleware
        next(error);
    }
};
