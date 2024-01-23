const expressSession = require('express-session');
const dotenv = require('dotenv');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const { LOG } = require('../config/logger.config');

dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const store = new MongoDBStore({
  uri: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
  collection: 'sessions'
});

store.on('error', (error) => LOG.error(error.message));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'app-secret',
  store: store,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: true,
    secure: true
  }
};

const sessionMiddleware = expressSession(sessionOptions);

module.exports = { sessionMiddleware };
