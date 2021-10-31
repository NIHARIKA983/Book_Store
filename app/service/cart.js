const models = require('../models/cart')

class Service {

  /**
* @description   : It is used to add book to the cart taking data from controller
*                  and sending to models
* @param {book}  : it contains data which we are passing from body
*/
addToCart = (book, resolve, reject) => {
  models.addToCart(book)
    .then((data) => resolve(data))
    .catch(() => reject());
}
}

module.exports = new Service();