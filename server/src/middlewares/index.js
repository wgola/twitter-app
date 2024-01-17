const authorizationMiddleware = require('./authorization.middleware');
const loggingMiddleware = require('./logging.middleware');
const sessionMiddleware = require('./session.middleware');

module.exports = {
  authorizationMiddleware,
  loggingMiddleware,
  sessionMiddleware
};
