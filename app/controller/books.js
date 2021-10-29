/**
 * @description   : It is use to taking the request from the client and gives the response.
 * @file          : books.js
 * @author        : Niharika K V
*/
const service = require('../service/books');
const { logger } = require('../logger/logger');
const validation = require('../utility/bookValidation');


class BookController {
  /**
   * @description : It is adding a book in bookstore.
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : addBook 
  */
  addBook =(req, res) => {
      try {
        const bookDetails = {
          author: req.body.author,
          title: req.body.title,
          quantity: req.body.quantity,
          price: req.body.price,
          description: req.body.description,
        };
        const validationResult = validation.bookPropertyValidation.validate(bookDetails);
          if (validationResult.error) {
          return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: validationResult
          });
        }
        service.addBook(bookDetails, (error, data) => {
          if (error) {
            logger.error('failed to addBook');
            return res.status(400).json({
              message: 'failed to addBook',
              success: false
            });
          } else {
            logger.info('Successfully inserted book');
            return res.status(201).send({
              message: 'Successfully inserted book',
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error('Internal server error');
        return res.status(500).json({
          message: 'Error occured',
          success: false
        });
      }
  }

  /**
   * @description : It is getting all existing books from bokkStore
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getAllBooks 
  */
  getAllBooks = (req, res) => {
    try {
      service.getAllBooks(resolve, reject);
      function resolve (data) {
        logger.info('Get All Books successfully');
        return res.status(201).json({
          message: 'Get All Books successfully',
          success: true,
          data: data
        });
      }
      function reject () {
        logger.error('Failed to get all Books');
        return res.status(400).json({
          message: 'failed to get all Books',
          success: false
        });
      }
    } catch {
      logger.error('Internal Error');
      return res.status(500).json({
        message: 'Internal Error'
      });
    }
  };
}

    
module.exports = new BookController();