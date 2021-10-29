const Joi = require('joi');

class BookHelper {
  
  bookPropertyValidation = Joi.object({
    author: Joi.string()
      .min(3)
      .required()
      .pattern(new RegExp('^[A-Za-z ]{3,}$')),

    title: Joi.string()
      .min(3)
      .required(),

    quantity: Joi.number()
      .required(),

    price: Joi.number()
      .required(),

    description: Joi.string()
        .required()
  });

  updateBookProperty = Joi.object({
    author: Joi.string()
      .min(3)
      .required()
      .pattern(new RegExp('^[A-Za-z ]{3,}$')),

    title: Joi.string()
      .min(3)
      .required(),

    quantity: Joi.number()
      .required(),

    price: Joi.number()
      .required(),

    description: Joi.string()
        .required(),
    
    bookId: Joi.string()
        .required(),
  });

}

module.exports = new BookHelper();