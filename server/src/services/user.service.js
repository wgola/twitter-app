const bcrypt = require('bcrypt');
const { LOGGER } = require('../config');
const { User } = require('../models');

const createUser = async (username, password, firstname, lastname) => {
  try {
    const user = {
      username,
      password: bcrypt.hashSync(password, 8),
      firstname,
      lastname
    };

    const createdUser = await User.create(user);

    return createdUser;
  } catch (err) {
    LOGGER.error(err);

    throw new Error('Error creating user: ' + err);
  }
};

module.exports = {
  createUser
};
