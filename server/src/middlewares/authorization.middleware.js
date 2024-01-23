const { LOG } = require('../config');

const authorizationMiddleware = (req, res, next) => {
  if (!req.user) {
    LOG.error('Unauthorized request');
    res.status(403).send({ message: 'Unauthorized!' });
    return;
  }

  LOG.info('Authorized request');
  next();
};

module.exports = { authorizationMiddleware };
