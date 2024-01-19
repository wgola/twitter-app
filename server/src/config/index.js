const passportConfig = require('./passport.config');
const sessionConfig = require('./session.config');
const sslOptions = require('./ssl.config');
const LOGGER = require('./logger.config');
const dbConfig = require('./db.config');
const imagekit = require('./imagekit.config');

module.exports = {
  LOGGER,
  sslOptions,
  ...passportConfig,
  ...dbConfig,
  sessionConfig,
  imagekit
};
