const LOGGER = require('../config/logger');

const loggingMiddleware = (req, _res, next) => {
  const message = {
    hostname: req.hostname,
    method: req.method,
    url: req.originalUrl
  };

  LOGGER.info(message);
  next();
};

module.exports = loggingMiddleware;
