const authController = require('./auth.controller');
const postController = require('./post.controller');
const userController = require('./user.controller');

module.exports = {
  ...authController,
  ...postController,
  ...userController
};
