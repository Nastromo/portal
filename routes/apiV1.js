const login = require('./v1/login');




const apiV1 = (app) => {
    app.use(`/v1/login`, login);

}

module.exports = apiV1;
