import BankAccount from './BankAccount.js';

const bankAccount = new BankAccount(loadBalance());

// DOM
const amountInput = document.getElementById('amount-input');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const balanceValue = document.getElementById('balance-value');
const log = document.getElementById('log');

updateBalance();

// Event
// 입금
depositBtn.addEventListener('click', () => {
  const amount = +amountInput.value;
  bankAccount.deposit(amount);
  updateBalance();
  addLog(`${amount.toLocaleString()}원 입금`);
  amountInput.value = '';
});

//출금
withdrawBtn.addEventListener('click', () => {
  const amount = +amountInput.value;
  bankAccount.withdraw(amount);
  updateBalance();
  addLog(`${amount.toLocaleString()}원 출금`);
  amountInput.value = '';
});

// localStorage에 저장
function saveBalance(amount) {
  localStorage.setItem('myBalance', amount);
}

// 잔액 조회
function loadBalance() {
  return localStorage.getItem('myBalance')*1;
}

// 잔액 업데이트
function updateBalance() {
  const amount = bankAccount.getBalance();
  balanceValue.textContent = amount.toLocaleString();
  saveBalance(amount);
}

// 입출금 내역 출력
function addLog(text) {
  const li = document.createElement('li');
  const now = new Date();
  const time = now.toLocaleTimeString();
  li.textContent = `[${time}] ${text}`;
  log.append(li);
}
