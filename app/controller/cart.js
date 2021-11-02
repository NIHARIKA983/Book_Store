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
  
}

module.exports = new CartController();