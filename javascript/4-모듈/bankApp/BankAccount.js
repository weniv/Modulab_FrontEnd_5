export default class BankAccount {
  #balance; // private field(외부에서 직접 접근 불가능)
  #maxWithdraw = 10000000;

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
    // this.#balance = this.#balance + amount;
  }

  withdraw(amount) {
    if (amount > this.#maxWithdraw) {
      // alert('1회 출금 한도 초과');
      Swal.fire({
        title: '앗!',
        text: `1회 출금 한도(${this.#maxWithdraw})를 초과했습니다.`,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      throw new Error(`1회 출금 한도(${this.#maxWithdraw})를 초과했습니다.`);
    }

    if (amount > this.#balance) {
      alert('잔액이 부족합니다.');
      throw new Error('잔액이 부족합니다.');
    }

    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}
