const { dbConnection } = require('../../src/repository/db');
require('dotenv/config');

describe('dbConneciton', () => {
  it('should connect to MongoDB', async () => {
    const clientDB = await dbConnection();
    console.log(clientDB);
    expect(clientDB.s.url).toEqual(process.env.MONGOCONNECT);
    clientDB.close();
  });
});
