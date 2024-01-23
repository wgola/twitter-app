const { LOG, io } = require('../config');

const notifyMainPage = (exceptedUser) => {
  io.to('main-page').except(exceptedUser).emit('new-post');
};

io.on('connect', (socket) => {
  const session = socket.request.session;
  session.socketId = socket.id;
  session.save();

  LOG.info(`Socket '${socket.id}' connected`);

  socket.join(socket.request.user.username);

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
});

module.exports = {
  notifyMainPage
};
