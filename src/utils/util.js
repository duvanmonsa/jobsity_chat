const winston = require('winston');
const path = require('path');

const models = require('../models');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'log-error.log'),
      level: 'error'
    }),
    new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logs', 'log-warn.log'), level: 'warn' }),
    new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logs', 'log-combined.log') })
  ]
});

const logError = async (error, userId = null) => {
  console.log('LOG_ERROR:', error, 'USER_ID:', userId);
  await models.Error.create({
    error,
    userId
  });
};

module.exports = { logger, logError };
