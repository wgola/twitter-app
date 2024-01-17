const expressSession = require('express-session');
const { sessionConfig } = require('../config');

const sessionMiddleware = expressSession(sessionConfig);

module.exports = sessionMiddleware;
