const { LOG } = require('../config');

const loggingMiddleware = (req, _res, next) => {
  const message = {
    hostname: req.hostname,
    method: req.method,
    url: req.originalUrl
  };

  LOG.info(message);
  next();
};

module.exports = { loggingMiddleware };
