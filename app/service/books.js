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

    /**
     * @description   : It is used to find all existing books taking data from controller
     *                  and sending to models
     * @param {data}  : it contains data which we are passing from body
     * @returns       : books which we are fetching
    */
    getAllBooks = ( resolve, reject) => {
      bookModel
        .getAllBooks()
        .then((data) => resolve(data))
        .catch(() => reject());
    };
     
    /**
   * @description   : It is used to fetch an existing book taking data from controller
   *                  and sending to models
   * @param {id}  : it contains data which we are passing from body
   */
    getBook = async (id) => {
      try {
        return await bookModel.getBook(id);
      } catch (err) {
        return err;
      }
    }
    

    /**
     * @description   : It is used to update an existing book taking data from controller
     *                  and sending to models
     * @param {bookDetails}  : it contains data which we are passing from body
    */
    updateBook = (bookDetails, resolve, reject) => {
      bookModel
        .updateBook(bookDetails)
        .then((data) => resolve(data))
        .catch(() => reject());
    };

     /**
     * @description   : It is used to delete an existing book taking data from controller
     *                  and sending to models
     * @param {bookDetails}  : it contains data which we are passing from body
     */

    deleteBook = async (bookDetails) => {
      try {
        return await bookModel.deleteBook(bookDetails);
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Service();