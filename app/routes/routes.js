const controller = require('../controller/registration');
const helper = require('../utility/helper.js');
module.exports = (app) => {

    app.post('/user/registration',helper.setRole('user'), controller.register);

    app.post('/admin/registration', helper.setRole('admin'), controller.register);
}  