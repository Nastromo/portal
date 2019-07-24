const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE);
const { Payment } = require('../../db');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



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

    const payment = await Payment.create({
        userId: req.user.userId,
        testTitle,
        quantity,
        status: status === `succeeded` ? `submitted` : `errored`,
        amount,
        address,
        city,
        state,
        zip,
    });

    sgMail.send({
        to: ['big.voice86@gmail.com', 'vyushvah@empirecitylabs.com'],
        from: 'Info@empr.com',
        subject: 'New Payment',
        text: 'You have received new payment',
        html: '<strong>You have received new payment (this is test mode for Portal)</strong>',
    });

    res.json(payment);

})
);






module.exports = router;