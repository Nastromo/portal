const Token = require('../utils/Token');
const { User } = require('../db');



const checkRequest = async (req, res, next) => {
    const urls = [`/v1/login`, `/v1/registration`];
    
    if (!urls.includes(req.originalUrl)) {
        try {
            const token = await Token.validate(req.headers);
            req.user = await User.findOne({ where: { userId: token.userId } });
            delete req.user.pass;
            next();
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    } else {
        next();
    }
}





module.exports = checkRequest;