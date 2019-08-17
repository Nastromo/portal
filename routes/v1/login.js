const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../db');
const jwt = require('jsonwebtoken');



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
        const user = await User.findOne({ where: { email } });
        if (user) {

            const result = await bcrypt.compare(pass, user.pass);
            if (!result) {
                res.status(403).send(`Credentials are wrong`);
                return;
            }

            if (!user.isAccepted) {
                res.json({
                    isAccepted: false
                });
                return;
            }

            if (!user.isConfirmed) {
                res.json({
                    isAccepted: true,
                    isConfirmed: false 
                });
                return;
            }

            delete user.pass;
            user.token = await createToken(user.userId);
            res.json(user);

        } else {
            res.status(400).send(`No such user`);
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



module.exports = router;