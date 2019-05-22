const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE);
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


router.post('/', errorHandler(async (req, res, next) => {
    const { amount, token, testTitle, quantity, address, city, state, zip } = req.body;

    let { status } = await stripe.charges.create({
        amount,
        currency: "usd",
        description: testTitle,
        source: token.id
    });

    await Payment.create({
        userId: req.user.userId,
        testTitle,
        quantity,
        status,
        amount,
        address,
        city,
        state,
        zip,
    })

    res.json({ status });

})
);






module.exports = router;