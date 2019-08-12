const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE);
const { Payment, Test } = require('../../db');
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
    const { amount, token, tests, address, city, state, zip } = req.body;

    let { status } = await stripe.charges.create({
        amount,
        currency: "usd",
        description: "Order from My Wellcom",
        source: token.id
    });

    const payment = await Payment.create({
        userId: req.user.userId,
        status: status === `succeeded` ? `submitted` : `errored`,
        amount,
        address,
        city,
        state,
        zip,
    });

    for (let i = 0; i < tests.length; i++) {
        await Test.create({
            userId: req.user.userId,
            status: status === `succeeded` ? `submitted` : `errored`,
            title: tests[i].title,
            quantity: tests[i].quantity,
        });
    }

    sgMail.send({
        to: ['big.voice86@gmail.com'],
        from: 'Info@empr.com',
        subject: 'New Payment',
        text: 'You have received new payment',
        html: '<strong>You have received new payment (this is test mode for Portal)</strong>',
    });

    sgMail.send({
        to: [`${req.user.email}`],
        from: 'Info@empr.com',
        subject: 'Your Payment',
        text: 'Thank you for your payment!',
        html: `<strong>Thank you for your payment! TOTAL PRICE: $${amount/100} </strong>`,
    });

    res.json(payment);

})
);






module.exports = router;