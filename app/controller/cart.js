const services = require('../service/cart')
const { logger } = require('../logger/logger');

class CartController {

    /**
       * @description : It is adding book to cart in bookstore
       * @param {httprequest} req
       * @param {httpresponse} res
       * @method       : addToCart 
      */
    addToCart = async (req, res) => {
    try {
      const id = {
        bookId: req.body.bookId,
        userId: req.userId
      };
      const data = await services.addToCart(id);
      if (!data.message) {
        return res.status(404).json({
          message: 'book was unable to add in cart',
          success: false
        });
      }
      return res.status(200).json({
        message: 'book is added to cart successfully',
        success: true,
        data: id

      });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal Error',
        success: false,
        data: err
      });
    }
  }
}

module.exports = new CartController();