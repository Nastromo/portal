const login = require('./v1/login');
const registration = require('./v1/registration');
const makePayment = require('./v1/makePayment');
const user = require('./v1/user');
const results = require('./v1/results');




const apiV1 = (app) => {
    app.use(`/v1/login`, login);
    app.use(`/v1/registration`, registration);
    app.use(`/v1/user`, user);
    app.use(`/v1/make-payment`, makePayment);
    app.use(`/v1/results`, results);
    

}

module.exports = apiV1;
