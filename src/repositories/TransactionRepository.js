const { DB } = require('./DB');
require('dotenv/config');
const ObjectId = require('mongodb').ObjectId;

class TransactionRepository extends DB {
  constructor() {
    super();
    this.collectionName = 'transaction';
  }

  async create(transaction) {
    const connection = await this.dbConnection();
    const result = await connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .insertOne(transaction);
    connection.close();
    return result;
  }

  async findByObjectID(objectID) {
    const connection = await this.dbConnection();
    const result = await connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .findOne({ _id: ObjectId(objectID) });
    connection.close();
    return result;
  }

  async findAll(payload) {
    const connection = await this.dbConnection();
    const result = await connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .find(payload)
      .toArray();
    connection.close();
    return result;
  }

  async balance(user_id) {
    const connection = await this.dbConnection();
    const result = await connection
      .db(process.env.DATABASE)
      .collection(this.collectionName)
      .aggregate([
        {
          $match: {
            user_id,
          },
        },
        {
          $group: {
            _id: '$type',
            field: {
              $sum: {
                $cond: {
                  if: {
                    $eq: ['$type', 'CREDIT'],
                  },
                  then: '$amount',
                  else: {
                    $multiply: ['$amount', -1],
                  },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            result: {
              $sum: '$field',
            },
          },
        },
      ])
      .toArray();
    connection.close();
    return result;
  }
}

module.exports = { TransactionRepository };
