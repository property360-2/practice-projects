// Define the BankAccount class
class BankAccount {
    constructor() {
      this.balance = 0;
      this.transactions = [];
    }
  
    deposit(amount) {
      if (amount > 0) {
        this.transactions.push({ type: 'deposit', amount: amount });
        this.balance += amount;
        return `Successfully deposited $${amount}. New balance: $${this.balance}`;
      } else {
        return "Deposit amount must be greater than zero.";
      }
    }
  
    withdraw(amount) {
      if (amount > 0 && amount <= this.balance) {
        this.transactions.push({ type: 'withdraw', amount: amount });
        this.balance -= amount;
        return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
      } else {
        return "Insufficient balance or invalid amount.";
      }
    }
  
    checkBalance() {
      return `Current balance: $${this.balance}`;
    }
  
    listAllDeposits() {
      const deposits = this.transactions
        .filter(t => t.type === 'deposit')
        .map(t => t.amount);
      return `Deposits: ${deposits.join(',')}`;
    }
  
    listAllWithdrawals() {
      const withdrawals = this.transactions
        .filter(t => t.type === 'withdraw')
        .map(t => t.amount);
      return `Withdrawals: ${withdrawals.join(',')}`;
    }
  }
  
  // Create an instance named myAccount
  const myAccount = new BankAccount();
  
  // Add at least five transactions: 3 deposits, 2 withdrawals
  myAccount.deposit(150);    // Deposit #1
  myAccount.deposit(50);     // Deposit #2
  myAccount.deposit(30);     // Deposit #3
  myAccount.withdraw(40);    // Withdrawal #1
  myAccount.withdraw(20);    // Withdrawal #2
  
  // At this point, total deposits = 230, withdrawals = 60, balance = 170 (which is > 100)
  