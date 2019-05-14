const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../db');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');



const errorHandler = reqHandler => {
    return async (req, res, next) => {
        try {
            await reqHandler(req, res, next)
        } catch (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
    }
}


router.post('/', errorHandler(async (req, res, next) => {
    const { email, pass } = req.body;

    if (email && pass) {
        // send verification email
        const user = await createUser(req);
        if (user.isNew) {
            delete user.pass;
            user.token = await createToken(user.userId);
            res.json(user);
        } else {
            res.status(409).send(`User already exist`);
        }
    } else {
        res.status(400).send(`Login and password are required`);
    }
})
);


const createToken = (userId) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ userId }, process.env.SECRET_KEY, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });
}

const createUser = async (req) => {
    const { email, pass } = req.body;
    const user = await User.findOrCreate({
        where: { email },
        defaults: {
            userId: uuidv4(),
            userRole: `user`,
            regDate: new Date().getTime(),
            email,
            pass: await bcrypt.hash(pass, 8)
        }
    }).spread((data, isNew) => {
        let user;
        if (isNew) {
            user = data.get({ plain: true });
            user.isNew = true;
            return user;
        } else {
            user = data;
            user.isNew = false;
            return user;
        }
    });
    return user;
}


module.exports = router;