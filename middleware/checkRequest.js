const Token = require('../utils/Token');
const { User } = require('../db');



const checkRequest = async (req, res, next) => {
    const urls = [`/v1/login`];
    
    if (!urls.includes(req.originalUrl)) {
        try {
            await bindUser(req, next);
            next();
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    } else {
        next();
    }
}



const bindUser = async (req) => {
    const token = await Token.validate(req.headers);
    req.user = await getUser(token.userId);
}


const getUser = async (userId) => {
    return await User.findOne({
        where: {
            userId
        },
        attributes: [
            `userId`,
            `userRole`,
            `regDate`,
            `login`,
        ],
        raw: true,
    });
}


module.exports = checkRequest;