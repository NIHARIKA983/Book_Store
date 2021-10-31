const services = require('../service/cart')
const { logger } = require('../logger/logger');

class CartController {

    /**
       * @description : It is adding book to cart in bookstore
       * @param {httprequest} req
       * @param {httpresponse} res
       * @method       : addToCart 
      */
     addToCart = (req, res) => {
        try {
            const data  = {
              bookId: req.body.bookId,
              userId: req.userId
            };
            services.addToCart(data, resolve, reject);
            function resolve (data) {
              logger.info('book is added to cart successfully');
              res.status(201).send({
                message: 'book is added to cart successfully',
                success: true,
                data: data
              });
            }
            function reject () {
              logger.error('book was unable to add in cart');
              res.status(500).send({
                message: 'book was unable to add in cart',
                success: false
              });
            }
          }catch {
          logger.error('book is not added error occured');
          return res.status(500).send({
            message: 'Error occured',
            success: false
          });
          }
      }
}

module.exports = new CartController();