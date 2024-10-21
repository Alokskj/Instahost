import { config } from 'dotenv';
config();

const _config = {
    port: process.env.PORT as string,
    mongoURI: process.env.MONGODB_URI as string,
    env: process.env.NODE_ENV as string,
    jwtSecret: process.env.JWT_SECRET as string,
    smtpUser: process.env.SMTP_USER as string,
    maxFreeProjectLimit: process.env.MAX_FREE_PROJECT_LIMIT as string,
    smtpPASS: process.env.SMTP_PASS as string,
    baseURL: process.env.BASE_URL as string,
    host: process.env.HOST as string,
    platformCname: process.env.PLATFORM_CNAME as string,
    protocol: process.env.PROTOCOL as string,
    clientURL: process.env.CLIENT_URL as string,
    cookieSecret: process.env.COOKIE_SECRET as string,
    awsRegion: process.env.AWS_REGION as string,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME as string,
    awsS3BucketBaseURL: process.env.AWS_S3_BUCKET_BASE_URL as string,
    googleClientID: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
