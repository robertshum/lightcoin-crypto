// This process of passing an object the information it needs when we create it is a great design pattern.

//the Withdrawl and Deposit obj. no longer dependent on data that is in global or outer scope (like the balance global variable );

// This pattern is called Dependency Injection. It's a fancy word that simply means "passing an object the things it needs rather than having the object access them itself". It makes for code that is much more modular and testable.

class Account {

  constructor(userName) {
    this.userName = userName;

    // balance starts at 0
    this._balance = 0;

    this.transactions = [];
  }

  get balance() {

    let sum = 0;
    for (let trans of this.transactions) {
      sum += trans.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {

    if (this.isAllowed()) {
      //time
      this.time = new Date();

      //add transaction to the account
      this.account.addTransaction(this);
    }

    //invalid
    console.log("invalid request");
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    if (this.amount > this.account.balance) {
      return false;
    }

    //good to go (amount <= balance)
    return true;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    //why on earth does the bank ever complain if you can deposit more money
    return true;
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log("transaction 3:", t3);

t4 = new Withdrawal(119.00, myAccount);
t4.commit();
console.log("transaction 4:", t4);

console.log('Balance:', myAccount.balance);
