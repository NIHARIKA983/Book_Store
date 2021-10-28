/**
 * @description   : It is work as a middleware between models and controller
 * @file          : registration.js
 * @author        : Niharika K V
*/
const models = require('../models/registration');
const bcrypt = require('bcrypt');
const utilities = require('../utility/helper.js');

class Service {
  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : register from models
  */
  register = (data, callback) => {
    models.register(data, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
   });
  }; 
  
  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : InfoLogin, callback
   * @method          : login from models
  */
  userLogin = (InfoLogin, callback) => {
    models.loginModel(InfoLogin, (error, data) => {
      if (data) {
        bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
          if (!validate) {

            return callback(error + 'Invalid Password', null);
          } else {
            const token = utilities.token(data);
            return callback(null, token);
          }
        });
      } else {
        return callback(error);
      }
    });
  }
}

module.exports = new Service();
