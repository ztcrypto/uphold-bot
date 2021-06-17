const express = require('express');
const botRoute = require('./bot.route');

const router = express.Router();

router.use('/bot', botRoute);

module.exports = router;
