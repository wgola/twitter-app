const storageService = require('./storage.service');
const postsService = require('./post.service');
const authService = require('./auth.service');
const userService = require('./user.service');
const wsService = require('./ws.service');

module.exports = {
  ...storageService,
  ...postsService,
  ...authService,
  ...userService,
  ...wsService
};
