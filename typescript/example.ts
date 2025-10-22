// a, b가 number타입임을 명시
// 이 함수가 반환하는 값이 number임을 명시
function add(a: number, b:number): number {
  return a + b;
}
 
// const result = add(1, '2'); // 에러: 인자 '2'의 타입이 'number'가 아님
// console.log(result);

let value: unknown;
value = "hello";
 
// 타입 검사 없이 사용 불가
// console.log(value.length); // 에러!
 
// 타입 검사 후 사용 가능
if (typeof value === "string") {
    console.log(value.length); // 정상 동작
}