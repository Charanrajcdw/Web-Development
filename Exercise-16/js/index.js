const OUTPUT_CONTAINER = document.getElementById("outputContainer");

/**
 * Bank closure function with all transaction functions
 *
 * @param {number} cardNumber - it is to find the user
 */
function Bank(cardNumber) {
  const USER_ACCOUNTS = [
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
    currentUser = USER_ACCOUNTS.find((account) => account.cardNumber === cardNumber);
    if (!currentUser) {
      OUTPUT_CONTAINER.innerText = "INVALID CARD NO!!!";
    } else {
      const PIN = parseInt(prompt("Enter your pin:"));
      if (currentUser.pin !== PIN) {
        OUTPUT_CONTAINER.innerText = "INVALID PIN!!!";
      } else {
        const TRANSACTION_OPTION = parseInt(prompt("Enter 1.Withdraw 2.Deposit:"));
        transaction(TRANSACTION_OPTION);
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
        OUTPUT_CONTAINER.innerText = "INVALID TRANSACTION!!!";
    }
  }

  /**
   * This function withdraws amount from the user account
   */
  function withdraw() {
    const AMOUNT = parseInt(prompt("Enter the amount to withdraw:"));
    if (AMOUNT > currentUser.balance) {
      OUTPUT_CONTAINER.innerText = "INVALID BALANCE!!!";
    } else {
      currentUser.balance -= AMOUNT;
      OUTPUT_CONTAINER.innerText = `Withdraw amount: ${AMOUNT} Balance: ${currentUser.balance}`;
    }
  }

  /**
   * This function deposits amount into the user account
   */
  function deposit() {
    const AMOUNT = parseInt(prompt("Enter the amount to deposit:"));
    currentUser.balance += AMOUNT;
    OUTPUT_CONTAINER.innerText = `Deposit amount: ${AMOUNT} Balance: ${currentUser.balance}`;
  }
}

const CARD_NUMBER = parseInt(prompt("Enter your card number:"));

Bank(CARD_NUMBER);
