// 구현하세요
function printName<T extends { name: string }>(obj: T): void {
  // 여기에 코드 작성
  console.log(obj.name);
}

// 테스트
printName({ name: 'Alice', age: 25 }); // 'Alice'
printName({ name: 'Bob' }); // 'Bob'
// printName({ age: 30 }); // 에러 발생해야 함