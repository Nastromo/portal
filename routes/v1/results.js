const express = require('express');
const router = express.Router();
const { Payment } = require('../../db');




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


router.get('/', errorHandler(async (req, res, next) => {
    const payments = await Payment.findAll({ where: { userId: req.user.userId } });
    res.json(payments);
})
);



module.exports = router;