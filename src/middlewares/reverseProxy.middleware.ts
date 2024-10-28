import { NextFunction, Request, Response } from 'express';
import httpProxy from 'http-proxy';
import ProjectModel from '../models/project.model';
import _config from '../config/_config';

// Middleware function for reverse proxy
const reverseProxy = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Extract subdomain from the request hostname
    const hostname = req.hostname; // e.g. 'evara.com' or 'evara.instahost.com' or 'instahost.com'
    console.log(hostname);
    const host = _config.host; // e.g 'instahost.com'
    let domain;
    if (hostname.includes(host)) {
        if (hostname !== host) {
            domain =
                hostname.split('.').length > host.split('.').length
                    ? hostname.split('.')[0]
                    : null;
        } else {
            domain = null;
        }
    } else {
        domain = hostname;
    }

    // If no subdomain found, pass the request to the next middleware
    if (!domain) {
        return next();
    }

    try {
        // Find the project associated with the subdomain
        const project = await ProjectModel.findOne({
            $or: [{ subdomain: domain }, { customDomain: domain }],
            active: true,
        });

        // If no project found, send a response indicating no deployment found
        if (!project) {
            res.status(404).send();
            return;
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
        proxy.on('proxyReq', async (proxyReq, req) => {
            const url = req.url;
            // Append 'index.html' to the path if the request URL is '/'
            if (url === '/') {
                proxyReq.path += 'index.html';
                await project?.increaseVisitCount();
            }
        });
        proxy.on('proxyRes', (proxyRes, req, res) => {
            if (proxyRes.statusCode === 403) {
                res.setHeader('server', 'Instahost');
                res.writeHead(404);
                res.end();
            }
        });
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
};

export default reverseProxy;
