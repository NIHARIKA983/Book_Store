const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const utilities = require('../utility/helper.js');

const registrationSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: [{ type: String, required: true}]
}, {
  timestamps: true
});

const RegistrationModel = mongoose.model('Registration', registrationSchema);

class Model {

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
}

module.exports = new Model();