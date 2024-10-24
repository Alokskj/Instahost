import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    limit: 60, // each IP can make up to 60 requests per `windowsMs` (1 minutes)
    standardHeaders: true, // add the `RateLimit-*` headers to the response
    legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});
