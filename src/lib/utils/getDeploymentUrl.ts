import _config from '../../config/_config';

const getDeploymentUrl = (subDomain: string) => {
    const protocol = _config.protocol;
    const host = _config.host;
    const port = _config.port === '80' ? '' : `:${_config.port}`;
    return `${protocol}://${subDomain}.${host}${port}`;
};
export default getDeploymentUrl;
