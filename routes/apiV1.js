const login = require('./v1/login');
const registration = require('./v1/registration');




const apiV1 = (app) => {
    app.use(`/v1/login`, login);
    app.use(`/v1/registration`, registration);

}

module.exports = apiV1;
