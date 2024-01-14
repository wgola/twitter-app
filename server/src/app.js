const express = require('express');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const cors = require('cors');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/postRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(loggingMiddleware);

app.use('/api/posts', postsRouter);

app.get('/api', (_req, res) => {
  res.json({ msg: 'Y API v1' });
});

module.exports = app;
