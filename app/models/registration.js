/**
 * @description   : It is use to create schema in data base and doing schema vlidation and
 *                  encrypting password.
 * @package       : mongoose, bcrypt
 * @file          : registration.js
 * @author        : Niharika K V
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const utilities = require('../utility/helper.js');
const { logger } = require('../logger/logger');

const registrationSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true}
}, {
  timestamps: true
});

const RegistrationModel = mongoose.model('Registration', registrationSchema);

class Model {
  /**
   * @description     : It is use to create and save a new note in data base.
   * @param           : data, callback
   * @method          : save to save the coming data in data base
  */

  register = (data, callback) => {
    const note = new RegistrationModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role
    });
    try {
      utilities.hashing(data.password, (error, hash) => {
        if (hash) {
          note.password = hash;
          note.save((error, data) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, data);
            }
          });
        } else {
          throw error;
        }
      });
    } catch (error) {
      return callback('Internal error', null);
    }
  };
  
  /**
   * @description     : It uses to login the registered user
   * @param           : loginInfo, callback
  */
  loginModel = (loginInfo, callback) => {
    try {
      RegistrationModel.findOne({ email: loginInfo.email }, (error, data) => {
        if (error) {
          return callback(error, null);
        } else if (!data) {
          return callback('Invalid email', null);
        } else {
          return callback(null, data);
        }
      });
    } catch (error) {
      callback('Internal error', null);
    }
  }
  
  /**
   * @description     : It uses to if a user forgot his/her password so send a mail
   * @param           : data, callback
  */
  forgotPassword = (data, callback) => {
    RegistrationModel.findOne({ email: data.email }, (err, data) => {
      if (err) {
        logger.error('User with email id doesnt exists');
        return callback('User with email id doesnt exists', null);
      } else {
        return callback(null, data);
      }
    });
  };
   
  /**
   * @description     : It uses to if a user wants to reset his/her password
   * @param    {userData} : taking from service
   * @param  {callback}: giving result back to service
   * @method          : findOneAndUpdate to update password with new one
  */
  resetPassword = async (userData, callback) => {
    const hashPass = bcrypt.hashSync(userData.password, 10);
    const data = await RegistrationModel.findOne({ email: userData.email });
    RegistrationModel.findByIdAndUpdate(data.id, { firstName: data.firstName, lastName: data.lastName, password: hashPass }, { new: true }, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };
}

module.exports = new Model();