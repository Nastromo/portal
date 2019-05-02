const jwt = require('jsonwebtoken');

class Token {
    static verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_KEY, (err, userData) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(userData);
                }
            });
        });
    }

    static async validate(headers) {
        let bearer_token = headers['x-auth'];
        if (bearer_token) {
            let array = bearer_token.split(' ');
            let token = array[1];
            return this.verify(token);
        } else {
            throw new Error(`Token validation error`);
        }
    } 
}

module.exports = Token;