const verifyToken = require('../../../middlewares/verifyToken');
const { PresenterWEB } = require('../../../presenter/presenterWEB');
const {
  TransactionRepository,
} = require('../../../repositories/TransactionRepository');
const { FetchBalance } = require('../../../useCase/balance/FetchBalance');

module.exports = app => {
  const route = app.route('/balance/:user_id');

  route.get(verifyToken, (req, res) => {
    const user_id = req.params.user_id;
    new FetchBalance(
      new PresenterWEB(res),
      new TransactionRepository(),
    ).execute(user_id);
  });
};
