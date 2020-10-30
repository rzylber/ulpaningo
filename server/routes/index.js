const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = require('../secret');

// TODO: handle errors!!

/* TOKEN MIDDLEWARE */

router.use(function (req, res, next) {
    const token = req.get('x-access-token');

    if(token) {
        try {
            const decoded = jwt.verify(token, secret);
            res.locals.user = decoded;
        } catch(e) {
            console.log('Token error', e.message);
        }
    }

    next()
})

router.use('/poal', require('../pealim-service/router.js'));


module.exports = router;