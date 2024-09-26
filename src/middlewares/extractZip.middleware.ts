import { NextFunction, Request, Response } from 'express';
import { getLocalProjectDirPath } from '../utils/getLocalProjectDirPath';
import fs from 'node:fs/promises';
import path from 'node:path';
import extract from 'extract-zip';
// Middleware to extract the zip file after upload
export const extractZip = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const projectId = req.params.projectId;
        const projectLocalDirPath = getLocalProjectDirPath(projectId);
        const zipFilePath = path.join(
            projectLocalDirPath,
            req.file?.originalname as string,
        );

        // Check if the uploaded file exists
        await fs.stat(zipFilePath);

        // Create an instance of AdmZip to extract the zip file
        await extract(zipFilePath, { dir: projectLocalDirPath });

        // Optionally, delete the original zip file after extraction
        await fs.rm(zipFilePath);

        next(); // Call the next middleware
    } catch (err) {
        next(new Error('Error extracting zip file'));
    }
};
