import { config } from 'dotenv';
config();

const _config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGODB_URI,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    smtpUser: process.env.SMTP_USER,
    smtpPASS: process.env.SMTP_PASS,
    baseURL: process.env.BASE_URL,
    host: process.env.HOST,
    protocol: process.env.PROTOCOL,
    cookieSecret: process.env.COOKIE_SECRET,
    awsRegion: process.env.AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME,
    awsS3BucketBaseURL: process.env.AWS_S3_BUCKET_BASE_URL,
    redisURI: process.env.REDIS_URI,
    redisPassword: process.env.REDIS_PASSWORD,
    redisPort: process.env.REDIS_PORT,
} as const;
// verify that environment variables are correctly defined
function checkEnvVariables() {
    const requiredEnvVariables = Object.keys(_config);
    for (const variable of requiredEnvVariables) {
        if (!_config[variable as keyof typeof _config]) {
            throw new Error(`Environment variable ${variable} is not set`);
        }
    }
}
checkEnvVariables();

export default _config;
