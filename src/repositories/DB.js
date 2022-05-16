const { MongoClient } = require('mongodb');
require('dotenv/config');

class DB {
  async dbConnection() {
    const client = await MongoClient.connect(process.env.MONGOCONNECT, {
      useNewUrlParser: true,
    });
    return client;
  }
}
module.exports = { DB };
