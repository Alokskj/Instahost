import _config from '../../config/_config';

export const getVerificationMailUrl = (
    userId: string,
    verificationToken: string,
) => {
    return `${_config.baseURL}/api/auth/verify/${userId}/${verificationToken}`;
};
