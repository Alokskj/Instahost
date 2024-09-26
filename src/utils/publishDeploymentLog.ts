import io from '../config/socket';

const publishDeploymentLog = (log: string | object, deploymentId: string) => {
    // io.to(`logs:${deploymentId}`).emit('message', log);
    // redis.publish(`logs:${deploymentId}`, JSON.stringify(log));
};

export default publishDeploymentLog;
