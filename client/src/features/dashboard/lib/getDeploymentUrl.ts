const getDeploymentUrl = (subDomain: string) => {
    const protocol = import.meta.env.VITE_PROTOCOL;
    const host = import.meta.env.VITE_HOST;
    return `${protocol}://${subDomain}.${host}`;
};
export default getDeploymentUrl;
