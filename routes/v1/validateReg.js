const express = require('express');
const router = express.Router();
const { User } = require('../../db');
const Token = require('../../utils/Token');



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
    await Token.verify(req.body.token);
    await User.update({
        isConfirmed: true,
        firstName: req.body.first,
        lastName: req.body.last,
        dob: req.body.dob,
    }, { where: { userId: req.user.userId } });
    res.status(200).end();
})
);



module.exports = router;