const {
  createLogger,
  format: { combine, timestamp, prettyPrint, json },
  transports: { Console }
} = require('winston');

const LOG = createLogger({
  format: combine(timestamp(), json(), prettyPrint()),
  transports: [new Console()]
});

module.exports = { LOG };
