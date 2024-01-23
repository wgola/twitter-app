const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { LOG } = require('./logger.config');

dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const connectToDb = async () => {
  try {
    await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    LOG.info(`Connected to database '${MONGO_DB}'`);

    return true;
  } catch (error) {
    LOG.error(`Error connecting to database: ${error.message}`);

    return false;
  }
};

module.exports = { connectToDb };
