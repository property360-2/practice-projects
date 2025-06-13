class BankAccount {
  constructor() {
    const savedData = JSON.parse(localStorage.getItem('bankAccount'));
    this.balance = savedData?.balance || 0;
    this.transactions = savedData?.transactions || [];
    this.updateUI();
  }

  saveToStorage() {
    localStorage.setItem(
      'bankAccount',
      JSON.stringify({ balance: this.balance, transactions: this.transactions })
    );
  }

  deposit(amount) {
    if (amount > 0) {
      this.transactions.push({ type: 'deposit', amount });
      this.balance += amount;
      this.saveToStorage();
      this.updateUI();
      return true;
    }
    alert("Enter a valid deposit amount.");
    return false;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.transactions.push({ type: 'withdraw', amount });
      this.balance -= amount;
      this.saveToStorage();
      this.updateUI();
      return true;
    }
    alert("Invalid or insufficient amount.");
    return false;
  }

  updateUI() {
    document.getElementById('balance').textContent = `₱${this.balance.toFixed(2)}`;
    const deposits = this.transactions.filter(t => t.type === 'deposit');
    const withdrawals = this.transactions.filter(t => t.type === 'withdraw');

    const depositHistory = deposits.map(t => `<p>+₱${t.amount}</p>`).join('');
    const withdrawHistory = withdrawals.map(t => `<p>-₱${t.amount}</p>`).join('');

    document.getElementById('deposit-history').innerHTML = `<h4>Deposits</h4>${depositHistory || '<p>No deposits yet.</p>'}`;
    document.getElementById('withdraw-history').innerHTML = `<h4>Withdrawals</h4>${withdrawHistory || '<p>No withdrawals yet.</p>'}`;
  }
}

const myAccount = new BankAccount();

document.getElementById('deposit').addEventListener('click', () => {
  const amount = parseFloat(prompt("Enter amount to deposit:"));
  myAccount.deposit(amount);
});

document.getElementById('withdraw').addEventListener('click', () => {
  const amount = parseFloat(prompt("Enter amount to withdraw:"));
  myAccount.withdraw(amount);
});
