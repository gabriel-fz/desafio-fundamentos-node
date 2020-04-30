import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(t => {
        return t.type === 'income';
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);

    const outcome = this.transactions
      .filter(t => {
        return t.type === 'outcome';
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value;
      }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create(title: string, value: number, type: string): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
