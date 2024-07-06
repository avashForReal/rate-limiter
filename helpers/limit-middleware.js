const { TokenBucket } = require("./token-bucket")
const { TimerFreeTokenBucket } = require("./timer-free-token-bucket")

function limitRequestMiddlware(capacity, fillRate) {
    const bucket = new TokenBucket(capacity, fillRate);

    return function rateLimitMiddleware(_, res, next) {
        if (bucket.takeToken()) {
            next();
        } else {
            res.status(429).send('Rate limit exceeded');
        }
    }
}

function ipBasedLimitMiddleware(capacity, fillRate) {
    const allBuckets = new Map()

    return function ipRateLimitMiddleware(req, res, next) {
        // check if the incoming IP has been assigned a bucket previously,
        // if not assign a new TimerFreeTokenBucket
        if (!allBuckets.has(req.ip)) {
            allBuckets.set(req.ip, new TimerFreeTokenBucket(capacity, fillRate));
        }

        // get the bucket assigned the IP of the incoming request
        const bucketOfIP = allBuckets.get(req.ip);
        
        if (bucketOfIP.takeToken()) {
            next();
        } else {
            res.status(429).send('Rate limit exceeded');
        }
    }
}

module.exports = { limitRequestMiddlware , ipBasedLimitMiddleware}
