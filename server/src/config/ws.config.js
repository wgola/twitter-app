const { Server } = require('socket.io');
const passport = require('passport');
const { sessionMiddleware } = require('../middlewares/session.middleware');

const io = new Server({
  cors: {
    origin: 'https://localhost:5173',
    credentials: true
  }
});

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('Unauthorized user!'));
  }
});

module.exports = { io };
