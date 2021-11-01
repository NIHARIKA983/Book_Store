const models = require('../models/cart')

class Service {

  /**
* @description   : It is used to add book to the cart taking data from controller
*                  and sending to models
* @param {book}  : it contains data which we are passing from body
*/
addToCart = async (id) => {
  try {
    return await models.addToCart(id);
  } catch (err) {
    return err;
  }
}
}

module.exports = new Service();