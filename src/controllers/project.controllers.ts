import { Request, Response } from 'express';
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

export const deployProject = asyncHandler(
    async (req: Request, res: Response) => {
        const { projectId } = req.body;
        // Find the project to check if it belongs to the current user
        const project = await ProjectModel.findOne({
            _id: projectId,
            userId: req.user,
        });
        if (!project) {
            throw new ApiError(404, 'Project not found');
        }
        // clone the project locally
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
        for (const file of projectFiles) {
            const filePath = path.join(projectLocalDirPath, file.toString());

            // Skip if it's a directory
            if (fs.lstatSync(filePath).isDirectory()) continue;
            // replace \ with /
            const normalizedFilePath = file.toString().replace(/\\/g, '/'); // Normalize path separators

            console.log('Uploading', normalizedFilePath);

            const uploadCommand = new PutObjectCommand({
                Bucket: _config.awsS3BucketName,
                Key: `__websites/${project._id}/${normalizedFilePath}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath),
            });

            await s3Client.send(uploadCommand);
        }

        res.status(200).json(
            new ApiResponse(200, undefined, 'files uploaded successfully'),
        );
    },
);
