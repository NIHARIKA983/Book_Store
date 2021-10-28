/**
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : helper.js
 * @author        : Niharika K V
*/
require('dotenv').config();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/registration')
/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/
class Helper {
 authSchema = Joi.object({
   firstName: Joi.string()
    .min(3)
    .required()
    // .pattern(new RegExp('^[A-Z][a-z]{3,}$')),
    .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),

   lastName: Joi.string()
    .min(2)
    .required(),
    
   email: Joi.string()
    .pattern(new RegExp('([a-z0-9\\.-]+)@([a-z0-9-]+).([a-z]{2,4})(.[a-z]{2})?$'))
    .required(),

   password: Joi.string()
    .required()
    // .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}')),
    .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')),

   role: Joi.string()
    .required()
 });

 setRole = (role) => {
    return (req, res, next) => {
        req.role = role;
        next();
    }
  }

 hashing = (password, callback) => {
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      throw err;
    } else {
      return callback(null, hash);
    }
  });
 };
  

 /**
   * @description   : creating token using jsonwebtoken module
   * @param {data} as data which comes from the body of postmen
   * @module        : jwt
  */
  token = (data) => {
   const dataForToken = {
     id: data._id,
     firstName: data.firstName,
     lastName: data.lastName,
     email: data.email
   };
   console.log(dataForToken);
   return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '24H' });
 }

 
}

module.exports = new Helper();