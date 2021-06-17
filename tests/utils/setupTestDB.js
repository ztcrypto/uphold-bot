const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
  });

  beforeEach(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
