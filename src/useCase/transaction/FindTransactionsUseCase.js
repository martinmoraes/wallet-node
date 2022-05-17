class FindTransactionsUseCase {
  constructor(presenter, transactionRepository) {
    this.transactionRepository = transactionRepository;
    this.presenter = presenter;
  }

  async execute(user_id) {
    try {
      const foundTransactions = await this.findAllTransactions(user_id);
      this.presenter.ok(foundTransactions);
    } catch (error) {
      this.presenter.fail(error.message);
    }
  }

  async findAllTransactions(user_id) {
    const payload = user_id ? { user_id } : {};
    const allTransactions = await this.transactionRepository.findAll(payload);
    allTransactions.map(transaction => {
      transaction.id = transaction._id.toString();
      delete transaction._id;
      return transaction;
    });
    return allTransactions;
  }
}

module.exports = { FindTransactionsUseCase };
