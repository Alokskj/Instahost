import _config from '../../config/_config';

const getDeploymentUrl = (subDomain: string) => {
    const protocol = _config.protocol;
    const host = _config.host;
    return `${protocol}://${subDomain}.${host}`;
};
export default getDeploymentUrl;
