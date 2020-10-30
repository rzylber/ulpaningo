const express = require('express');
const router = express.Router();

const pealimService = require('./index');

router.get('/test', async (req, res) => {

    const result = await pealimService.test();

    res.json(result);
});

module.exports = router;