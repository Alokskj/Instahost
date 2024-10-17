import _config from '../../config/_config';

const getDeploymentUrl = (subdomain: string) => {
    const protocol = _config.protocol;
    const host = _config.host;
    const port = _config.port === '80' ? '' : `:${_config.port}`;
    return `${protocol}://${subdomain}.${host}${port}`;
};
export default getDeploymentUrl;
