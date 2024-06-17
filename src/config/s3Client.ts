import { S3Client } from '@aws-sdk/client-s3';
import _config from './_config';

const s3Client = new S3Client({
    region: 'ap-south-1',
    maxAttempts: 15,
    credentials: {
        accessKeyId: _config.awsAccessKeyId as string,
        secretAccessKey: _config.awsSecretAccessKey as string,
    },
});

export default s3Client;
