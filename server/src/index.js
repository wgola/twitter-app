const https = require('https');
const { connectToDb, LOGGER, sslOptions } = require('./config');
const app = require('./app');

const main = async () => {
  const isConnectedToDb = await connectToDb();

  if (isConnectedToDb) {
    const PORT = process.env.PORT || 8080;

    const server = https.createServer(sslOptions, app);
    server.listen(PORT, () => LOGGER.info(`App is listenning on: 'https://localhost:${PORT}'`));
  }
};

main();
