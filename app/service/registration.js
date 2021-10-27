const models = require('../models/registration');

class Service {
  register = (data, callback) => {
    models.register(data, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
   });
  }; 
}

module.exports = new Service();
