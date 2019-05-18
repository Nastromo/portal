const login = require('./v1/login');
const registration = require('./v1/registration');
const makePayment = require('./v1/makePayment');




const apiV1 = (app) => {
    app.use(`/v1/login`, login);
    app.use(`/v1/registration`, registration);
    app.use(`/v1/make-payment`, makePayment);
    

}

module.exports = apiV1;
