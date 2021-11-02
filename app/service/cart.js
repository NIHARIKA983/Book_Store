const models = require('../models/cart')

class Service {

  /**
* @description   : It is used to add book to the cart taking data from controller
*                  and sending to models
* @param {book}  : it contains data which we are passing from body
*/
addToCart = (userInfo, callback) =>{
  models.addToCart(userInfo, (err, data)=>{
      if(err){
          return callback(err, null)
      }
      else{
          return callback(null, data)
      }
  })
}
}

module.exports = new Service();