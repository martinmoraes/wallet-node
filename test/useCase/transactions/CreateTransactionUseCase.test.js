const {
  CreateTransactionUseCase,
} = require('../../../src/useCase/transaction/CreateTransactionUseCase');
const {
  TransactionRepository,
} = require('../../../src/repositories/TransactionRepository');
const { PresenterConsole } = require('../../../src/presenter/presenterConsole');
const ObjectId = require('mongodb').ObjectId;
const sinon = require('sinon');

describe('CreateTransactonUseCase', () => {
  let createdTransactionUseCase;
  beforeEach(() => {
    createdTransactionUseCase = new CreateTransactionUseCase(
      new PresenterConsole(),
      new TransactionRepository(),
    );
  });
  it('should return transaction without _id', async () => {
    const objetoOriginal = new TransactionRepository();
    const objectStub = sinon.stub(objetoOriginal, 'findByObjectID').returns({
      _id: new ObjectId('6280ebc9fca7d95bd295cb30'),
      user_id: '123',
      type: 'CREDIT',
      amount: 100,
    });

    const createdTransacton = {
      acknowledged: true,
      insertedId: new ObjectId('6280f1b8da446a4c1be0b3de'),
    };
    const resulted = await createdTransactionUseCase.findTransaction(
      createdTransacton,
    );
    expect(resulted).toEqual(
      expect.objectContaining({ user_id: '123', type: 'CREDIT', amount: 100 }),
    );
  });

  it.skip('should return user of docker users', async () => {
    const user_id = '222';
    const resulted = await createdTransactionUseCase.userIsValid({ user_id });
    console.log(resulted.data);
    expect(resulted.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        email: expect.any(String),
      }),
    );
  });
});
