import { NextFunction, Request, Response } from 'express';
import { getLocalProjectDirPath } from '../lib/utils/getLocalProjectDirPath';
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

        // delete the original zip file after extraction
        await fs.rm(zipFilePath);

        // Check the contents of the extracted folder
        const extractedFiles = await fs.readdir(projectLocalDirPath);
        // If there is only one folder, move its contents up to the parent folder
        if (extractedFiles.length === 1) {
            const singleItemPath = path.join(
                projectLocalDirPath,
                extractedFiles[0],
            );
            const singleItemStat = await fs.stat(singleItemPath);
            // Check if the item is a folder
            if (singleItemStat.isDirectory()) {
                const folderContents = await fs.readdir(singleItemPath);

                // Move each file/folder inside the single extracted folder
                for (const item of folderContents) {
                    const sourcePath = path.join(singleItemPath, item);
                    const destinationPath = path.join(
                        projectLocalDirPath,
                        item,
                    );

                    // Move the item (file/folder)
                    await fs.rename(sourcePath, destinationPath);
                }

                // Remove the now empty folder
                await fs.rmdir(singleItemPath);
            }
        }

        next(); // Call the next middleware
    } catch (err) {
        console.log(err);
        next(new Error('Error extracting zip file'));
    }
};
