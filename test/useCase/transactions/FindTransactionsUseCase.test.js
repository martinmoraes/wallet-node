const {
  FindTransactionsUseCase,
} = require('../../../src/useCase/transaction/FindTransactionsUseCase');
const {
  TransactionRepository,
} = require('../../../src/repositories/TransactionRepository');
const { PresenterConsole } = require('../../../src/presenter/presenterConsole');
const ObjectId = require('mongodb').ObjectId;
const sinon = require('sinon');

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
    const objetoOriginal = new TransactionRepository();
    const objectStub = sinon.stub(objetoOriginal, 'findAll').returns([
      {
        _id: new ObjectId('6280ebc9fca7d95bd295cb30'),
        user_id: '123',
        type: 'CREDIT',
        amount: 100,
      },
    ]);
    const resulted = await findTransactionUseCase.findAllTransactions(user_id);
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
