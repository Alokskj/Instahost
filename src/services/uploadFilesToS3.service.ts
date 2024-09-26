import fs from 'node:fs';
import path from 'path';
import publishDeploymentLog from '../utils/publishDeploymentLog';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import _config from '../config/_config';
import mime from 'mime';
import pLimit from 'p-limit';
import s3Client from '../config/s3Client';
const uploadFilesToS3 = async (
    projectFiles: string[],
    projectLocalDirPath: string,
    deploymentId: string,
    projectId: string,
) => {
    const limit = pLimit(100);
    // Upload each file to AWS S3 bucket concurrently
    const uploadPromises = projectFiles.map(async (file) => {
        const filePath = path.join(projectLocalDirPath, file.toString());

        // Skip if it's a directory
        if (fs.lstatSync(filePath).isDirectory()) return;

        // Normalize file path separators (replace \ with /)
        const normalizedFilePath = file.toString().replace(/\\/g, '/');

        publishDeploymentLog(`Uploading ${normalizedFilePath}`, deploymentId);

        // Create an upload command for AWS S3
        const uploadCommand = new PutObjectCommand({
            Bucket: _config.awsS3BucketName,
            Key: `__websites/${projectId}/${normalizedFilePath}`,
            Body: fs.createReadStream(filePath),
            ContentType: mime.lookup(filePath),
        });

        // Execute the upload command
        return limit(() => s3Client.send(uploadCommand));
    });

    // Wait for all uploads to complete
    await Promise.all(uploadPromises);
};

export default uploadFilesToS3;
