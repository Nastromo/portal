const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE);




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
    const { amount, token, testTitle } = req.body;

    let { status } = await stripe.charges.create({
        amount,
        currency: "usd",
        description: testTitle,
        source: token.id
    });

    res.json({ status });

})
);






module.exports = router;