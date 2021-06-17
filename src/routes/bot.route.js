const express = require('express');
const botController = require('../controllers/bot.controller');

const router = express.Router();

router.route('/runBot').post(botController.runBot);
router.route('/stopBot').post(botController.stopBot);

module.exports = router;
