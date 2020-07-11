import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome')
      throw new Error('The type must be income or outcome');

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value)
      throw new Error('Not enought balance for this transaction.');

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
