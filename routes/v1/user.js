const express = require('express');
const router = express.Router();




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
    if (req.user) res.json(req.user);
    else res.status(403).send(`No such user`)
})
);




module.exports = router;