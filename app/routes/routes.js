const controller = require('../controller/registration');
const helper = require('../utility/helper.js');
module.exports = (app) => {

    app.post('/userRegistration',helper.setRole('user'), controller.register);

    app.post('/adminRegistration', helper.setRole('admin'), controller.register);

    app.post('/login', controller.login);
}  