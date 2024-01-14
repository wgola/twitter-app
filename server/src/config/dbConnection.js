require('dotenv').config();

const mongoose = require('mongoose');
const LOGGER = require('./logger');

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const connectToDb = async () => {
  try {
    await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
    LOGGER.info(`Connected to database '${MONGO_DB}'`);

    return true;
  } catch (err) {
    LOGGER.error(`Error connecting to database: ${err}`);

    return false;
  }
};

module.exports = { connectToDb };
