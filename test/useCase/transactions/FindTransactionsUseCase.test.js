const {
  FindTransactionsUseCase,
} = require('../../../src/useCase/transaction/FindTransactionsUseCase');
const {
  TransactionRepository,
} = require('../../../src/repositories/TransactionRepository');
const { PresenterConsole } = require('../../../src/presenter/presenterConsole');

describe('CreateTransactonUseCase', () => {
  let findTransactionUseCase;
  beforeEach(() => {
    findTransactionUseCase = new FindTransactionsUseCase(
      new PresenterConsole(),
      new TransactionRepository(),
    );
  });
  it('should return all transacton by user_id', async () => {
    const user_id = '123';
    const resulted = await findTransactionUseCase.findAllTransactions(user_id);
    console.log(resulted);
    expect(resulted).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: expect.any(String),
          type: expect.any(String),
          amount: expect.any(Number),
        }),
      ]),
    );
  });

  it('should return all transacton', async () => {
    const resulted = await findTransactionUseCase.findAllTransactions();
    console.log(resulted);
    expect(resulted).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: expect.any(String),
          type: expect.any(String),
          amount: expect.any(Number),
        }),
      ]),
    );
  });
});
