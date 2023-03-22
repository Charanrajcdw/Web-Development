const outputContainer = document.getElementById("outputContainer");

/**
 * Bank closure function with all transaction functions
 *
 * @param {number} cardNumber - it is to find the user
 */
function Bank(cardNumber) {
  const userAccounts = [
    { accountNumber: 1011, cardNumber: 1234, pin: 1234, balance: 1000 },
    { accountNumber: 1012, cardNumber: 2345, pin: 2345, balance: 2000 },
    { accountNumber: 1013, cardNumber: 3456, pin: 3456, balance: 3000 },
    { accountNumber: 1014, cardNumber: 4567, pin: 4567, balance: 1000 },
    { accountNumber: 1015, cardNumber: 5678, pin: 5678, balance: 2000 },
  ];

  let currentUser;

  /**
   * This function gets pin and allows the user to login
   *
   * @param {number} cardNumber - it is to validate and login the user
   */
  function login(cardNumber) {
    const matchingAccount = userAccounts.filter((account) => account.cardNumber == cardNumber);
    if (matchingAccount.length == 0) {
      outputContainer.innerText = "INVALID CARD NO!!!";
    } else {
      currentUser = matchingAccount[0];
      const pin = parseInt(prompt("Enter your pin:"));
      if (currentUser.pin != pin) {
        outputContainer.innerText = "INVALID PIN!!!";
      } else {
        const transactionOption = parseInt(prompt("Enter 1.Withdraw 2.Deposit:"));
        transaction(transactionOption);
      }
    }
  }

  login(cardNumber);

  /**
   * This function calls deposit and withdraw function
   *
   * @param {number} transactionOption - it is to call the respective transaction function
   */
  function transaction(transactionOption) {
    switch (transactionOption) {
      case 1:
        withdraw();
        break;
      case 2:
        deposit();
        break;
      default:
        outputContainer.innerText = "INVALID TRANSACTION!!!";
    }
  }

  /**
   * This function withdraws amount from the user account
   */
  function withdraw() {
    const amount = parseInt(prompt("Enter the amount to withdraw:"));
    if (amount > currentUser.balance) {
      outputContainer.innerText = "INVALID BALANCE!!!";
    } else {
      currentUser.balance -= amount;
      outputContainer.innerText = "Withdraw amount: " + amount + " Balance: " + currentUser.balance;
    }
  }

  /**
   * This function deposits amount into the user account
   */
  function deposit() {
    const amount = parseInt(prompt("Enter the amount to deposit:"));
    currentUser.balance += amount;
    outputContainer.innerText = "Deposit amount: " + amount + " Balance: " + currentUser.balance;
  }
}

const cardNumber = parseInt(prompt("Enter your card number:"));

Bank(cardNumber);
