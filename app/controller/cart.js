const services = require('../service/cart')
// const { logger } = require('../logger/logger');

class CartController {

    /**
       * @description : It is adding book to cart in bookstore
       * @param {httprequest} req
       * @param {httpresponse} res
       * @method       : addToCart 
      */
     addToCart = (req, res) =>{
      try{
          const userInfo = {
              userId:req.user.dataForToken.id,
              itemId: req.params.id,
              qty: req.body.qty
          }
          services.addToCart(userInfo, (err, data)=>{
              if(err){
                  return res.status(400).json({
                      message: err,
                      success: false
                  })
              }
              return res.status(201).json({
                  message: "Item added successfully",
                  success: true,
                  data: data
              })
          })
      }
      catch(error){
          return res.status(500).json({
              message: "Internal server error",
              success: false
          })
      }
  }

  removeBookFromCart = (req, res) => {
    try {
      const data = {
        bookId: req.body.bookId,
        userId: req.params.userId
      };
      services.removeBookFromCart(data).then(() => {
        res.status(200).send({
          success: true,
          message: 'book removed from cart successfully',
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'book was unable to remove from cart',
          err,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is getting all existing carts from bookStore
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getAllCarts 
  */
  getAllCarts = (req, res) => {
    try {
      services.getAllCarts(req).then((carts) => {
        res.status(200).send({
          success: true,
          message: 'fetched all carts successfully',
          carts,
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'unable to fetch carts',
          err,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  

  /**
   * @description : It is getting a existing cart from bookStore
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getCart 
  */
  getCart = (req, res) => {
    try {
      const data = {
        userId: req.params.userId
      }
      services.getCart(data).then((carts) => {
        res.status(200).send({
          success: true,
          message: 'fetched cart successfully',
          carts,
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'unable to fetch cart',
          err,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }


  /**
   * @description : It is remove book from cart
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : removeFromCart 
  */

  placeOrder = (req, res) => {
    try {
      const data = {
        cartId: req.params.cartId,
        userId: req.user.dataForToken.id,
        isPurchased:req.body.isPurchased
      };
      services.placeOrder(data).then(() => {
        res.status(200).send({
          success: true,
          message: 'order placed successfully'
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'unable to place order',
          err,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  
}

module.exports = new CartController();