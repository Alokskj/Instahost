import { PutObjectCommand } from '@aws-sdk/client-s3';
import _config from '../config/_config';
import s3Client from '../config/s3Client';

export const uploadImageToS3 = async (file: Uint8Array, projectId: string) => {
    const uploadKey = `__websites/thumbnails/${projectId}`;
    const uploadCommand = new PutObjectCommand({
        Bucket: _config.awsS3BucketName,
        Key: uploadKey,
        Body: file,
        ContentType: 'image/png',
    });
    await s3Client.send(uploadCommand);

    return `${_config.awsS3BucketBaseURL}/${uploadKey}`;
};
