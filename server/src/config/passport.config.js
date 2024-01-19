const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { getUserDetails } = require('../services/user.service');

const serialization = (user, done) => {
  done(null, user.username);
};

const deserialization = async (username, done) => {
  try {
    const user = await getUserDetails(username, username);

    done(null, user);
  } catch (err) {
    done(err, null);
  }
};

const strategy = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect password' });
    }

    const user_information = await getUserDetails(user.username, user.username);

    return done(null, user_information);
  } catch (err) {
    return done(err);
  }
};

const localStrategy = new passportLocal.Strategy(strategy);

module.exports = {
  serialization,
  deserialization,
  localStrategy
};
