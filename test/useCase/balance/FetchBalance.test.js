const {
  TransactionRepository,
} = require('../../../src/repositories/TransactionRepository');
const { PresenterConsole } = require('../../../src/presenter/presenterConsole');
const { FetchBalance } = require('../../../src/useCase/balance/FetchBalance');

describe('FetchBalance', () => {
  let fetchBalanceUseCase;
  beforeEach(() => {
    fetchBalanceUseCase = new FetchBalance(
      new PresenterConsole(),
      new TransactionRepository(),
    );
  });
  it('should return balance by user_id', async () => {
    const user_id = '123';
    const resulted = await fetchBalanceUseCase.fetchBalance(user_id);
    console.log(resulted);
    expect(resulted).toEqual(
      expect.objectContaining({ amount: expect.any(Number) }),
    );
  });
});
