const https = require('https');
const { connectToDb, LOGGER, sslOptions } = require('./config');
const app = require('./app');
const socketio = require('socket.io');
const { sessionMiddleware } = require('./middlewares');
const passport = require('passport');

const server = https.createServer(sslOptions, app);

const sio = socketio(server);

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

sio.use(wrap(sessionMiddleware));
sio.use(wrap(passport.initialize()));
sio.use(wrap(passport.session()));

sio.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('Unauthorized user!'));
  }
});

sio.on('connect', (socket) => {
  const session = socket.request.session;
  session.socketId = socket.id;
  session.save();
});

const main = async () => {
  const isConnectedToDb = await connectToDb();

  if (isConnectedToDb) {
    const PORT = process.env.PORT || 8080;

    server.listen(PORT, () => LOGGER.info(`App is listenning on: 'https://localhost:${PORT}'`));
  }
};

main();
