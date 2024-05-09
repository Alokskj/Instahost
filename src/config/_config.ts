import { config } from 'dotenv';
config();

const _config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGODB_URI,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    proxyServerURL: process.env.PROXY_SEVER_URL,
    proxyServerDomain: process.env.PROXY_SEVER_DOMAIN,
    smtpUser: process.env.SMTP_USER,
    smtpPASS: process.env.SMTP_PASS,
    baseURL: process.env.BASE_URL,
    cookieSecret: process.env.COOKIE_SECRET,
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
