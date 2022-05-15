const {
  CreateTransactionUseCase,
} = require('../../../src/useCase/transaction/CreateTransactionUseCase');
const {
  TransactionRepository,
} = require('../../../src/repositories/TransactionRepository');
const { PresenterConsole } = require('../../../src/presenter/presenterConsole');
const ObjectId = require('mongodb').ObjectId;

describe('CreateTransactonUseCase', () => {
  let createdTransactionUseCase;
  beforeEach(() => {
    createdTransactionUseCase = new CreateTransactionUseCase(
      new PresenterConsole(),
      new TransactionRepository(),
    );
  });
  it('should return transacton without _id', async () => {
    // const transaction = {
    //   _id: new ObjectId('6280ebc9fca7d95bd295cb30'),
    //   user_id: '123',
    //   type: 'CREDIT',
    //   amount: 100,
    // };

    const createdTransacton = {
      acknowledged: true,
      insertedId: new ObjectId('6280f1b8da446a4c1be0b3de'),
    };
    const resulted = await createdTransactionUseCase.findTransaction(
      createdTransacton,
    );
    console.log(resulted);
    expect(resulted).toEqual(
      expect.objectContaining({ user_id: '123', type: 'CREDIT', amount: 100 }),
    );
  });
});