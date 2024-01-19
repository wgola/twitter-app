const postsService = require('./post.service');
const userService = require('./user.service');
const storageService = require('./storage.service');

module.exports = {
  ...postsService,
  ...userService,
  ...storageService
};
