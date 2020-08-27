import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface ModelTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type} : ModelTransaction): Transaction {
    if(!["income", "outcome"].includes(type)){
      throw new Error('Não é uma operação valida! ')
    }

    const { total } = this.transactionsRepository.getBalance();

    if(type === "outcome" && total < value){
      throw new Error('Saldo insuficiente :(')
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
