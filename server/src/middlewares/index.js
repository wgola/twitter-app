const authorizationMiddleware = require('./authorization.middleware');
const loggingMiddleware = require('./logging.middleware');

module.exports = {
  authorizationMiddleware,
  loggingMiddleware
};
