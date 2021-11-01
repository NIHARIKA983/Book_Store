/**
 * @description   : It is use to route the APIs
 * @file          : routes.js
 * @author        : Niharika K V
*/
const controller = require('../controller/registration');
const helper = require('../utility/helper.js');
const middleware = require('../utility/helper.js');
const booksController = require('../controller/books');
const cartController = require('../controller/cart');
const redis = require('../utility/redis');

module.exports = (app) => {
     // api for userRegistration
    app.post('/userRegistration',helper.setRole('user'), controller.register);
    // api for adminRegistration
    app.post('/adminRegistration', helper.setRole('admin'), controller.register);
    // api for login
    app.post('/login', controller.login);
    // api for forgotpassword
    app.post('/forgotPassword', controller.forgotPassword);
    // api for reset-password
    app.put('/reset-Password', middleware.validateToken, controller.resetPassword);

    // Book CURD api
    app.post('/books', middleware.validateToken,helper.verifyRole, booksController.addBook);
    app.get('/getbooks', middleware.validateToken, booksController.getAllBooks);
    app.get('/getbooks/:id', middleware.validateToken,redis.redis_BookById,  booksController.getBook);
    app.put('/books/:bookId', middleware.validateToken,helper.verifyRole, booksController.updateBook);
    app.delete('/deletebooks/:bookId', middleware.validateToken,helper.verifyRole,booksController.deleteBook);
    
    // Add Book to cart
    app.post('/addToCart', middleware.validateToken, cartController.addToCart);


}  