class CreateTransactionUseCase {
  constructor(presenter, transactionRepository) {
    this.transactionRepository = transactionRepository;
    this.presenter = presenter;
  }

  async execute(transaction) {
    try {
      const objInstance = await this.createTransaction(transaction);
      const transactionReceived = await this.findTransaction(objInstance);
      this.presenter.ok(transactionReceived);
    } catch (error) {
      this.presenter.fail(error);
    }
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
