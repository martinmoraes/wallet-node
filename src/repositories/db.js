const { MongoClient } = require('mongodb');
require('dotenv/config');

async function dbConnection() {
  console.log(process.env.MONGOCONNECT);
  const client = await MongoClient.connect(process.env.MONGOCONNECT, {
    useNewUrlParser: true,
  });
  return client;
}

module.exports = { dbConnection };
