const postsService = require('./post.service');
const userService = require('./user.service');

module.exports = {
  ...postsService,
  ...userService
};
