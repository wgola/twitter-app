const { LOG, io } = require('../config');
const { likePost, dislikePost } = require('./post.service');
const { followUser, unfollowUser } = require('./user.service');

io.on('connect', (socket) => {
  const session = socket.request.session;
  session.socketId = socket.id;
  session.save();

  LOG.info(`Socket '${socket.id}' connected`);

  const currentUser = socket.request.user;

  socket.join(currentUser.username);

  socket.on('join-room', (room) => {
    LOG.info(`Socket '${socket.id}' joins room '${room}'`);
    socket.join(room);
  });

  socket.on('leave-room', (room) => {
    LOG.info(`Socket '${socket.id}' leaves room '${room}'`);
    socket.leave(room);
  });

  socket.on('disconnect', () => {
    LOG.info(`Socket '${socket.id}' disconnected`);
  });

  socket.on('like', async (postId, callback) => {
    try {
      await likePost(postId, currentUser.username);

      callback(true);
    } catch {
      callback(false);
    }
  });

  socket.on('dislike', async (postId, callback) => {
    try {
      await dislikePost(postId, currentUser.username);

      callback(true);
    } catch {
      callback(false);
    }
  });

  socket.on('follow', async (username, callback) => {
    try {
      await followUser(currentUser._id, username);

      callback(true);
    } catch {
      callback(false);
    }
  });

  socket.on('unfollow', async (username, callback) => {
    try {
      await unfollowUser(currentUser._id, username);

      callback(true);
    } catch {
      callback(false);
    }
  });
});

module.exports = {
  configuredIo: io
};
