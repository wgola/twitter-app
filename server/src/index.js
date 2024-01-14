const https = require('https');
const { connectToDb } = require('./config/dbConnection');
const options = require('./config/certificate');
const LOGGER = require('./config/logger');
const app = require('./app');

const main = async () => {
  const isConnectedToDb = await connectToDb();

  if (isConnectedToDb) {
    const PORT = process.env.PORT || 8080;

    const server = https.createServer(options, app);
    server.listen(PORT, () => LOGGER.info(`App is listenning on port ${PORT}`));
  }
};

main();
