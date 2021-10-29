/**
 * @description   : It is use to create schema in data base and doing schema vlidation.
 * @package       : mongoose
 * @file          : books.js
 * @author        : Niharika K V
*/

const { logger } = require('../logger/logger');
const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }

}, {
  timestamps: true

});

const BookModel = mongoose.model("BookModel", bookSchema);
class Model {
  /**
 * @description     : It is use to create and save a new book in data base.
 * @param           : data
 * @method          : save to save the coming data in data base
 */
  addBook = (info, callback) => {
      const book = new BookModel({
        author: info.author,
        title: info.title,
        quantity: info.quantity,
        price: info.price,
        description: info.description
      });
      book.save((error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }
}
module.exports = new Model();