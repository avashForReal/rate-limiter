const express = require('express');
const { ipBasedLimitMiddleware } = require('./helpers/limit-middleware');

const app = express();

// maximum burst capacity
const GLOBAL_BUCKET_CAPACITY = 5;
// number of tokens added in the bucket per second
const GLOBAL_FILL_PER_SECOND = 1;

// app.use(ipBasedLimitMiddleware(GLOBAL_BUCKET_CAPACITY,GLOBAL_FILL_PER_SECOND))

app.get('/',
    ipBasedLimitMiddleware(GLOBAL_BUCKET_CAPACITY,GLOBAL_FILL_PER_SECOND),
    (_, res) => {
        res.send('Hello from the rate limited API');
    }
);

app.listen(5500, () => console.log('Server is running'));