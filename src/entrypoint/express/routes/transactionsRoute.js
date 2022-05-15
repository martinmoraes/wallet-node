const verifyToken = require('../../../middlewares/verifyToken');
const { PresenterWEB } = require('../../../presenter/presenterWEB');
const {
  CreateTransactionUseCase,
} = require('../../../useCase/transaction/CreateTransactionUseCase');
const {
  FindTransactionsUseCase,
} = require('../../../useCase/transaction/FindTransactionsUseCase');
const {
  TransactionRepository,
} = require('../../../repositories/TransactionRepository');

module.exports = app => {
  const route = app.route('/transactions');

  route.post(verifyToken, (req, res) => {
    const transaction = req.body;
    new CreateTransactionUseCase(
      new PresenterWEB(res),
      new TransactionRepository(),
    ).execute(transaction);
  });

  const routeId = app.route('/transactions/:user_id');
  routeId.get(verifyToken, (req, res) => {
    const user_id = req.params.user_id;
    new FindTransactionsUseCase(
      new PresenterWEB(res),
      new TransactionRepository(),
    ).execute(user_id);
  });
};
