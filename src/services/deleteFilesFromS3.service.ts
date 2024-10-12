import { DeleteObjectsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import s3Client from '../config/s3Client';
import _config from '../config/_config';

export const deleteFilesFromS3 = async (projectId: string) => {
    const bucketName = _config.awsS3BucketName;
    const prefix = `__websites/${projectId}/`;
    // Get the list of objects (files) under the project directory
    const { Contents } = await s3Client.send(
        new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
        }),
    );

    if (!Contents || Contents.length === 0) {
        return true;
    }

    // Prepare an array of file keys for deletion
    const objectsToDelete = Contents.map((file) => ({ Key: file.Key }));

    // // Delete the files from S3
    const deleteResult = await s3Client.send(
        new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: {
                Objects: objectsToDelete,
            },
        }),
    );

    return true;
};
