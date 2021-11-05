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

  
}

module.exports = new CartController();