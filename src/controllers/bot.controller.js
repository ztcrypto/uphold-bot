const axios = require('axios');
const logger = require('../logger');

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

const priceData = {};
const botId = {};

const runBot = catchAsync(async (req, res) => {
  const { pairs, interval, percentage } = req.body;
  pairs.forEach((item) => {
    startBot(item, interval, percentage);
  });
  res.send('success');
});

const stopBot = catchAsync(async (req, res) => {
  const { pairs } = req.body;
  pairs.forEach((item) => {
    haltBot(item);
  });
  res.send('success');
});

const startBot = (pair = 'BTC-USD', interval = 5000, percentage = 0.01) => {
  if (botId[pair]) {
    logger.info('Bot already started');
    return;
  }
  const id = setInterval(async () => {
    try {
      const { data } = await axios.get(`https://api.uphold.com/v0/ticker/${pair}`);
      if (!priceData[pair]) {
        priceData[pair] = data.ask;
      } else {
        const change = ((parseFloat(data.ask) - priceData[pair]) / priceData[pair]) * 100;
        if (change > percentage) logger.info(`${pair} price changed ${change}% from: ${priceData[pair]} to: ${data.ask}`);
        priceData[pair] = data.ask;
      }
    } catch (err) {
      logger.error(err);
    }
  }, interval);
  botId[pair] = id;
};

const haltBot = (pair) => {
  if (!botId[pair]) return;
  clearInterval(botId[pair]);
  botId[pair] = 0;
};

module.exports = {
  runBot,
  stopBot,
};
