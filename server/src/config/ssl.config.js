const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const sslOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../certificate/key.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../certificate/cert.crt'))
};

module.exports = { sslOptions };
