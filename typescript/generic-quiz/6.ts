// 구현하세요
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  // 여기에 코드 작성
  return obj[key];
}

// 테스트
const user = { name: 'John', age: 30 };
const name = getValue(user, 'name'); // 'John', 타입: string
const age = getValue(user, 'age'); // 30, 타입: number