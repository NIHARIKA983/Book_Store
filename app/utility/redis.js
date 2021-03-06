const redis = require('redis');
const client = redis.createClient();
const { logger } = require('../logger/logger');
class Redis {
  /**
     * @description function written to provide data to user in minimal time using caching
     * @param {*} a req valid request is expected
     * @param {*} res depends on the request of user
     * @param {*} if there is no data function calls for next function
     */
   redis_BookById = (req, res, next) => {
     const bookId = req.params.id;
     client.get(bookId, (error, redis_data) => {
       if (error) {
         logger.error(error);
         throw error;
       } else if (redis_data) {
         logger.info('getLabels successfully retrieved');
         res.status(200).send({
           redis_BookById: JSON.parse(redis_data),
           message: 'getlabels successfully retrieved',
           success: true
         });
       } else {
         next();
       }
     });
    }
    

   setData = (key, time, redis_data) => {
    client.setex(key, time, redis_data);
  };
  /**
   * @description clearing cache
   */
  clearCache = (key) => {
    client.del(key, (err, res) => {
      if (err) {
        logger.error('cache not cleared');
      } else {
        console.log('Cache cleared');
        logger.info('Cache cleared');
      }
    });
  }
}
module.exports = new Redis();