import { NextFunction, Request, Response } from 'express';
import _config from '../config/_config';
import { ApiError } from '../lib/utils/ApiError';

// route not found handler
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new ApiError(404, `Not found - ${req.originalUrl}`);
    next(error);
};

// Error handler for development
export const devError = (err: ApiError, res: Response) => {
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

// Error handler for production
export const prodError = (err: ApiError, res: Response) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(500).json({
            success: false,
            status: 'error',
            message: 'something very went wrong!',
        });
    }
};
// global error handler
export const globalErrorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (_config.env === 'development') {
        devError(err, res);
    } else {
        prodError(err, res);
    }
};
