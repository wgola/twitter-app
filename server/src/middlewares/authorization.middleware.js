const { LOGGER } = require('../config');

const authorizationMiddleware = (req, res, next) => {
  if (!req.cookies[`connect.sid`]) {
    LOGGER.info('Unauthorized request');
    res.status(403).send({ message: 'Unauthorized!' });
    return;
  }

  LOGGER.info('Authorized request');
  next();
};

module.exports = authorizationMiddleware;
