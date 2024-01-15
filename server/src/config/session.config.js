const dotenv = require('dotenv');

dotenv.config();

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'app-secret',
  resave: true,
  saveUninitialized: false
};

module.exports = sessionOptions;
