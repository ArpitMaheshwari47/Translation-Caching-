const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100});

module.exports = duration => (req,res,next) => {
    //if req is not GET
    if(req.method !== 'GET') {
         return next();
    }
    //check if key exists in cache
    const key = req.originalUrl;
   
    const cacheResponse = cache.get(key);

    //if exists, send cache result
    if(cacheResponse) {
        res.send(cacheResponse);
    } else {
        //if not, replace ,send with method to  set response to cache
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body);
            cache.set(key, body, duration);
        };
        return next();
    }
}
