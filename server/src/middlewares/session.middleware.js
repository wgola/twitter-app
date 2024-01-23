const expressSession = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'app-secret',
  resave: true,
  saveUninitialized: false
};

const sessionMiddleware = expressSession(sessionOptions);

module.exports = { sessionMiddleware };
