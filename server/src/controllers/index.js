const authController = require('./auth.controller');
const postController = require('./post.controller');

module.exports = {
  ...authController,
  ...postController
};
