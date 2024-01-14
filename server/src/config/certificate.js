require('dotenv').config();
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../certificate/key.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../certificate/cert.crt'))
};

module.exports = options;
