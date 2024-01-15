const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { localStrategy, serialization, deserialization, sessionConfig } = require('./config');
const { authorizationMiddleware, loggingMiddleware } = require('./middlewares');
const { postsRouter, authRouter } = require('./routes');

const app = express();

app.use(loggingMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'https://localhost:5173' }));
app.use(helmet());
app.use(cookieParser());
app.use(expressSession(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(localStrategy);
passport.serializeUser(serialization);
passport.deserializeUser(deserialization);

app.use('/api/posts', authorizationMiddleware, postsRouter);

app.use('/api/auth', authRouter);

app.get('/api', (_req, res) => {
  res.json({ msg: 'Y API v1' });
});

module.exports = app;
