"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

console.log(account1);

console.log(...accounts);

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
//Display Movements
const displayMovements = function (acc) {
  containerMovements.innerHTML = "";

  acc.movements.forEach(function (mov, i, arr) {
    // console.log(mov);
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements);

/////////////////////////////////////////////////
//computing userNames
const computeUserNames = function (acc) {
  acc.forEach(function (acc, i) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
computeUserNames(accounts);
/////////////////////////////////////////////////
// calcPrintBalance;
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acum, el) {
    return acum + el;
  }, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
  // console.log(acc.balance);
};
// calcPrintBalance(accounts);
/////////////////////////////////////////////////
//Display Summary Section

const displaySummary = function (acc) {
  const deposit = acc.movements
    .filter((el) => el > 0)
    .reduce((acum, el) => acum + el, 0);
  labelSumIn.textContent = deposit;

  const withdrawal = acc.movements
    .filter((el) => el < 0)
    .reduce((acum, el) => acum + el, 0);
  labelSumOut.textContent = Math.abs(withdrawal);

  const interest = acc.movements
    .filter((el) => el > 0)
    .map((el) => (el * acc.interestRate) / 100)
    .reduce((acum, el) => acum + el, 0);
  labelSumInterest.textContent = interest;
};

// displaySummary(account1.movements);
/////////////////////////////////////////////////
//Global function call on balance/
const displayVariable = function (currentAccount) {
  //Current movements
  displayMovements(currentAccount);

  //Current balance
  calcPrintBalance(currentAccount);

  //Display Summary Section
  displaySummary(currentAccount);
};
/////////////////////////////////////////////////
//Login Feature
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (el) => el.userName === inputLoginUsername.value
  );
  if (currentAccount.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    containerApp.style.opacity = 100;

    //Current movements
    // displayMovements(currentAccount);

    // //Current balance
    // calcPrintBalance(currentAccount);

    // //Display Summary Section
    // displaySummary(currentAccount);
    displayVariable(currentAccount);
  }

  console.log(currentAccount);
});
/////////////////////////////////////////////////
//Transefre Money Feature
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  console.log("transfer money btn clicked");
});
/////////////////////////////////////////////////
// containerApp.style.opacity = 100;
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
