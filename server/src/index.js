const https = require('https');
const { connectToDb, LOG, sslOptions } = require('./config');
const { configuredIo } = require('./services');
const app = require('./app');

const main = async () => {
  const isConnectedToDb = await connectToDb();

  if (isConnectedToDb) {
    const PORT = process.env.PORT || 8080;

    const server = https.createServer(sslOptions, app);

    configuredIo.attach(server);

    server.listen(PORT, () => LOG.info(`App is listenning on: 'https://localhost:${PORT}'`));
  }
};

main();
