const verifyToken = require('../../../middlewares/verifyToken');
const { PresenterWEB } = require('../../../presenter/presenterWEB');
const {
  CreateTransactionUseCase,
} = require('../../../useCase/transaction/CreateTransactionUseCase');
const {
  TransactionRepository,
} = require('../../../repositories/TransactionRepository');

module.exports = app => {
  let route = app.route('/transactions');

  route.post(verifyToken, (req, res) => {
    const transaction = req.body;
    new CreateTransactionUseCase(
      new PresenterWEB(res),
      new TransactionRepository(),
    ).execute(transaction);
  });
};
