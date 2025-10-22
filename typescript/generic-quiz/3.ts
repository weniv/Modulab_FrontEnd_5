// 구현하세요
function merge<T>(arr1: T[], arr2: T[]): T[] {
  // 여기에 코드 작성
  return [...arr1, ...arr2];
//   return arr1.concat(arr2);
}

// 테스트
const numbers = merge([1, 2], [3, 4]); // [1, 2, 3, 4]
const strings = merge(['a', 'b'], ['c', 'd']); // ['a', 'b', 'c', 'd']