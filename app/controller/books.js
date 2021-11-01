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
  
  /**
   * @description : It is get an existing book from book store
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getBook 
  */
  getBook = async (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, bookId: req.params.id };
      const data = await service.getBook(id);
      if (data.message) {
        return res.status(404).json({
          message: 'Book not found',
          success: false
        });
      }
      return res.status(200).json({
        message: 'Book retrieved succesfully',
        success: true,
        data: data

      });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal Error',
        success: false,
        data: err
      });
    }
  }


  /**
   * @description : It is updating an existing book in bookstore for particular user.
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : updatebook 
  */

  updateBook = (req, res) => {
    try {
      const bookDetails = {
        author: req.body.author,
        title: req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        bookId: req.params.bookId
      };
      const validationResult = validation.updateBookProperty.validate(bookDetails);
      if (validationResult.error) {
        console.log(validationResult.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: validationResult
        });
      }
      service.updateBook(bookDetails, resolve, reject);
      function resolve (data) {
        logger.info('book Updated Successfully');
        return res.status(201).send({
          message: 'book Updated Successfully',
          success: true,
          data: data
        });
      }
      function reject () {
        logger.error('book Not Updated or bookId Is Not Match');
        return res.status(400).json({
          message: 'Note Not Updated or bookId Is Not Match',
          success: false
        });
      }
    } catch {
      logger.error('Internal Server Error');
      return res.status(500).json({
        message: 'Internal server error',
        success: false
      });
    }
  };

  /**
   * @description : It is deleting an existing book from book store
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : deleteBook 
  */
  deleteBook = async (req, res) => {
    try {
      const data = await service.deleteBook(req.params.bookId);
      if (data.message) {
        return res.status(404).json({
          message: 'book not found',
          success: false
        });
      }
      return res.status(200).json({
        message: 'book Deleted succesfully',
        success: true,
        data: data
      });
    } catch (err) {
      return res.status(500).json({
        message: 'book not deleted',
        success: false,
        data: err
      });
    }
  }
}

    
module.exports = new BookController();