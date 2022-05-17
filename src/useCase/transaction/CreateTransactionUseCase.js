const { Token } = require('../../servicesApplication/token');
const axios = require('axios');
require('dotenv/config');

class CreateTransactionUseCase {
  constructor(presenter, transactionRepository) {
    this.transactionRepository = transactionRepository;
    this.presenter = presenter;
  }

  async execute(transaction) {
    try {
      await this.userIsValid(transaction);
      const objInstance = await this.createTransaction(transaction);
      const transactionReceived = await this.findTransaction(objInstance);
      this.presenter.ok(transactionReceived);
    } catch (error) {
      this.presenter.fail(error.message);
    }
  }

  userIsValid({ user_id }) {
    const Authorization = new Token().generate({ user_id });
    return axios.get(`${process.env.DOCKER_USER_URL}${user_id}`, {
      headers: {
        Authorization,
      },
    });
  }

  async createTransaction(transaction) {
    return await this.transactionRepository.create(transaction);
  }

  async findTransaction(objInstance) {
    const transaction = await this.transactionRepository.findByObjectID(
      objInstance.insertedId.toString(),
    );
    transaction.id = transaction._id;
    delete transaction._id;
    return transaction;
  }
}

module.exports = { CreateTransactionUseCase };
