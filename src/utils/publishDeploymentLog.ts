import redis from '../config/redis';

const publishDeploymentLog = (log: string | object, deploymentId: string) => {
    redis.publish(`logs:${deploymentId}`, JSON.stringify(log));
};

export default publishDeploymentLog;
