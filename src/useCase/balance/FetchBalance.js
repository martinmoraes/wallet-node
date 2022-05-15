const { use } = require('express/lib/application');

class FetchBalance {
  constructor(presenter, transactionRepository) {
    this.transactionRepository = transactionRepository;
    this.presenter = presenter;
  }

  async execute(user_id) {
    try {
      const resultBalance = await this.fetchBalance(user_id);
      this.presenter.ok(resultBalance);
    } catch (error) {
      this.presenter.fail(error);
    }
  }

  async fetchBalance(user_id) {
    const resultBalance = await this.transactionRepository.balance(user_id);
    return { amount: resultBalance[0].result };
  }
}

module.exports = { FetchBalance };
