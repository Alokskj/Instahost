import { NextFunction, Request, Response } from 'express';
import httpProxy from 'http-proxy';
import _config from '../config/_config';
import ProjectModel from '../models/project.model';

// Middleware function for reverse proxy
const reverseProxy = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Extract subdomain from the request hostname
    const hostname = req.hostname;
    const subdomain =
        hostname.split('.').length > 1 ? hostname.split('.')[0] : null;

    // If no subdomain found, pass the request to the next middleware
    if (!subdomain) {
        return next();
    }

    try {
        // Find the project associated with the subdomain
        const project = await ProjectModel.findOne({
            subDomain: `${subdomain}.${_config.proxyServerDomain}`,
        });

        // If no project found, send a response indicating no deployment found
        if (!project) {
            return res.send('No deployment found.');
        }

        // Create a new HTTP proxy instance
        const proxy = httpProxy.createProxy();

        // Resolve the target URL for proxying
        const resolvesTo = `${
            _config.awsS3BucketBaseURL
        }/__websites/${project?._id.toString()}`;

        // Proxy the request to the target URL with options
        proxy.web(req, res, { target: resolvesTo, changeOrigin: true });

        // Add event listener for 'proxyReq' event to modify request before proxying
        proxy.on('proxyReq', (proxyReq, req, res) => {
            const url = req.url;
            // Append 'index.html' to the path if the request URL is '/'
            if (url === '/') {
                proxyReq.path += 'index.html';
            }
        });
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
};

export default reverseProxy;
