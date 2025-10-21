// a, b가 number타입임을 명시
// 이 함수가 반환하는 값이 number임을 명시
function add(a: number, b:number): number {
  return a + b;
}
 
// const result = add(1, '2'); // 에러: 인자 '2'의 타입이 'number'가 아님
// console.log(result);