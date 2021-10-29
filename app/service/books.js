/**
 * @description   : It is work as a middleware between models and controller
 * @file          : book.js
 * @author        : Niharika K V
*/

const { logger } = require('../logger/logger');
const bookModel = require('../models/books');
class Service {
    addBook = (book, callback) => {
      bookModel.addBook(book, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }
}
module.exports = new Service();